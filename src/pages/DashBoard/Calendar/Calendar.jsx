
import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    Clock3,
    CheckCircle2,
    CircleAlert,
    FolderKanban,
    ListTodo,
    RefreshCw,
    X,
    Zap,
    Users,
    ArrowUpRight,
} from "lucide-react";
import UseAxiosSecures from "../../../Hooks/UseAxiosSecures.jsx";


const getDateKey = (value) => {
    if (!value) return "";

    if (
        typeof value === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(value)
    ) {
        return value;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const parseDateKey = (key) => {
    const [year, month, day] = key.split("-").map(Number);
    return new Date(year, month - 1, day);
};

const formatDate = (value, options = {}) => {
    if (!value) return "No due date";

    const key = getDateKey(value);
    if (!key) return "Invalid date";

    return parseDateKey(key).toLocaleDateString(undefined, options);
};

const isCompleted = (task) =>
    ["done", "completed"].includes(
        (task.status || "").toLowerCase()
    );

const getTaskColor = (task, todayKey) => {
    if (isCompleted(task)) {
        return {
            event: "border-l-emerald-500 bg-emerald-50 text-emerald-700",
            dot: "bg-emerald-500",
        };
    }

    if (getDateKey(task.dueDate) < todayKey) {
        return {
            event: "border-l-rose-500 bg-rose-50 text-rose-700",
            dot: "bg-rose-500",
        };
    }

    if (getDateKey(task.dueDate) === todayKey) {
        return {
            event: "border-l-amber-500 bg-amber-50 text-amber-700",
            dot: "bg-amber-500",
        };
    }

    return {
        event: "border-l-indigo-500 bg-indigo-50 text-indigo-700",
        dot: "bg-indigo-500",
    };
};

const Calendar = () => {
    const axiosSecure = UseAxiosSecures();
    const [currentDate, setCurrentDate] = useState(() => new Date());
    const [view, setView] = useState("Month");
    const [selectedProject, setSelectedProject] = useState("all");
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedDate, setSelectedDate] = useState(() => new Date());

    const todayKey = getDateKey(new Date());

    const {
        data: tasks = [],
        isLoading,
        isError,
        error,
        refetch,
        isFetching,
    } = useQuery({
        queryKey: ["my-calendar-tasks"],
        queryFn: async () => {
            const response = await axiosSecure.get("/my-calendar-tasks");
            console.log(response)
            return Array.isArray(response.data) ? response.data : [];
        },
    });

    const projects = useMemo(() => {
        const projectMap = new Map();

        tasks.forEach((task) => {
            if (!task.projectId) return;

            const id = String(task.projectId);

            projectMap.set(id, {
                id,
                name: task.projectName || "Untitled project",
            });
        });

        return [...projectMap.values()].sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }, [tasks]);

    // The calendar only includes tasks with a due date.
    const filteredTasks = useMemo(
        () =>
            tasks.filter((task) => {
                if (!task.dueDate || !getDateKey(task.dueDate)) {
                    return false;
                }

                return (
                    selectedProject === "all" ||
                    String(task.projectId) === selectedProject
                );
            }),
        [tasks, selectedProject]
    );

    const tasksByDate = useMemo(() => {
        const grouped = {};

        filteredTasks.forEach((task) => {
            const key = getDateKey(task.dueDate);

            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(task);
        });

        Object.values(grouped).forEach((dayTasks) => {
            dayTasks.sort((a, b) =>
                (a.title || "").localeCompare(b.title || "")
            );
        });

        return grouped;
    }, [filteredTasks]);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthLabel = currentDate.toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
    });

    const monthStartKey = getDateKey(new Date(year, month, 1));
    const monthEndKey = getDateKey(new Date(year, month + 1, 0));

    const monthTasks = filteredTasks.filter((task) => {
        const key = getDateKey(task.dueDate);
        return key >= monthStartKey && key <= monthEndKey;
    });

    const dueToday = filteredTasks.filter(
        (task) =>
            getDateKey(task.dueDate) === todayKey &&
            !isCompleted(task)
    );

    const overdue = filteredTasks.filter(
        (task) =>
            getDateKey(task.dueDate) < todayKey &&
            !isCompleted(task)
    );

    const upcomingTasks = filteredTasks
        .filter(
            (task) =>
                getDateKey(task.dueDate) >= todayKey &&
                !isCompleted(task)
        )
        .sort((a, b) =>
            getDateKey(a.dueDate).localeCompare(
                getDateKey(b.dueDate)
            )
        )
        .slice(0, 6);

    // The mini calendar always shows the currently selected month.
    const miniCalendarDays = useMemo(() => {
        const start = new Date(year, month, 1);
        const offset = start.getDay();

        return Array.from({ length: 42 }, (_, index) => {
            const date = new Date(
                year,
                month,
                index - offset + 1
            );

            return {
                date,
                key: getDateKey(date),
                inMonth: date.getMonth() === month,
            };
        });
    }, [year, month]);

    // Generate dates for the main Month, Week, or Day view.
    const visibleDays = useMemo(() => {
        if (view === "Day") {
            return [new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate()
            )];
        }

        if (view === "Week") {
            const start = new Date(currentDate);
            start.setDate(start.getDate() - start.getDay());

            return Array.from({ length: 7 }, (_, index) => {
                const date = new Date(start);
                date.setDate(start.getDate() + index);
                return date;
            });
        }

        const firstDay = new Date(year, month, 1);
        const offset = firstDay.getDay();

        return Array.from({ length: 42 }, (_, index) =>
            new Date(year, month, index - offset + 1)
        );
    }, [currentDate, view, year, month]);

    const navigate = (direction) => {
        const next = new Date(currentDate);

        if (view === "Day") {
            next.setDate(next.getDate() + direction);
        } else if (view === "Week") {
            next.setDate(next.getDate() + direction * 7);
        } else {
            next.setMonth(next.getMonth() + direction);
        }

        setCurrentDate(next);
    };

    const goToToday = () => {
        const now = new Date();
        setCurrentDate(now);
        setSelectedDate(now);
    };

    const selectMiniDate = (date) => {
        setCurrentDate(date);
        setSelectedDate(date);
    };

    const mainTitle =
        view === "Month"
            ? monthLabel
            : view === "Week"
                ? `${formatDate(visibleDays[0], {
                    month: "short",
                    day: "numeric",
                })} – ${formatDate(visibleDays[6], {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                })}`
                : formatDate(currentDate, {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                });

    return (
        <div className="min-h-full bg-[#F5F7FC] px-4 py-6 text-slate-800 md:px-6 lg:px-8">
            <div className="mx-auto max-w-[1600px] space-y-5">

                {/* Page header */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-800">
                            Calendar
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            View your tasks and important deadlines in one place.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => refetch()}
                        disabled={isFetching}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium shadow-sm transition hover:bg-slate-50 disabled:opacity-60"
                    >
                        <RefreshCw
                            size={16}
                            className={isFetching ? "animate-spin" : ""}
                        />
                        Refresh
                    </button>
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <SummaryCard
                        label="Tasks This Month"
                        value={monthTasks.length}
                        note={`${filteredTasks.length} tasks with deadlines`}
                        icon={CalendarDays}
                        color="indigo"
                    />
                    <SummaryCard
                        label="Tasks Due Today"
                        value={dueToday.length}
                        note="Unfinished tasks"
                        icon={CheckCircle2}
                        color="emerald"
                    />
                    <SummaryCard
                        label="Overdue"
                        value={overdue.length}
                        note="Past deadlines"
                        icon={CircleAlert}
                        color="rose"
                    />
                    <SummaryCard
                        label="Meetings"
                        value={0}
                        note="Meeting support coming later"
                        icon={Users}
                        color="blue"
                    />
                </div>

                {isLoading && (
                    <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white">
                        <span className="loading loading-spinner loading-lg text-primary" />
                        <p className="mt-3 text-sm text-slate-500">
                            Loading your calendar...
                        </p>
                    </div>
                )}

                {isError && (
                    <div className="rounded-2xl border border-rose-200 bg-white p-8 text-center">
                        <CircleAlert
                            size={32}
                            className="mx-auto text-rose-500"
                        />
                        <h2 className="mt-3 font-semibold">
                            Could not load your calendar
                        </h2>
                        <p className="mt-2 text-sm text-slate-500">
                            {error?.response?.data?.message ||
                                "Please check your connection and try again."}
                        </p>
                        <button
                            type="button"
                            onClick={() => refetch()}
                            className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {!isLoading && !isError && (
                    <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_290px]">

                        {/* Main calendar */}
                        <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">

                            {/* Calendar toolbar */}
                            <div className="flex flex-col gap-4 border-b border-slate-100 p-4 lg:flex-row lg:items-center lg:justify-between">
                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="flex items-center gap-1">
                                        <button
                                            type="button"
                                            aria-label="Previous period"
                                            onClick={() => navigate(-1)}
                                            className="rounded-lg p-2 transition hover:bg-slate-100"
                                        >
                                            <ChevronLeft size={19} />
                                        </button>
                                        <button
                                            type="button"
                                            aria-label="Next period"
                                            onClick={() => navigate(1)}
                                            className="rounded-lg p-2 transition hover:bg-slate-100"
                                        >
                                            <ChevronRight size={19} />
                                        </button>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={goToToday}
                                        className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium transition hover:bg-slate-50"
                                    >
                                        Today
                                    </button>

                                    <h2 className="ml-1 text-lg font-bold text-slate-800">
                                        {mainTitle}
                                    </h2>
                                </div>

                                <div className="flex w-fit rounded-xl border border-slate-200 bg-slate-50 p-1">
                                    {["Month", "Week", "Day"].map((item) => (
                                        <button
                                            type="button"
                                            key={item}
                                            onClick={() => setView(item)}
                                            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${view === item
                                                    ? "bg-indigo-600 text-white shadow-sm"
                                                    : "text-slate-500 hover:text-slate-800"
                                                }`}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Legend and project filter */}
                            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                    <Legend color="bg-indigo-500" label="Upcoming" />
                                    <Legend color="bg-amber-500" label="Due today" />
                                    <Legend color="bg-rose-500" label="Overdue" />
                                    <Legend color="bg-emerald-500" label="Completed" />
                                </div>

                                <label className="flex items-center gap-2 text-xs text-slate-500">
                                    <FolderKanban size={15} />
                                    <select
                                        value={selectedProject}
                                        onChange={(event) =>
                                            setSelectedProject(event.target.value)
                                        }
                                        className="max-w-40 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-700 outline-none focus:border-indigo-400"
                                    >
                                        <option value="all">All projects</option>
                                        {projects.map((project) => (
                                            <option
                                                key={project.id}
                                                value={project.id}
                                            >
                                                {project.name}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>

                            {/* Main grid */}
                            <div className="overflow-x-auto">
                                <div className="min-w-[650px]">
                                    {view !== "Day" && (
                                        <div className="grid grid-cols-7 border-b border-slate-100">
                                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                                                (day) => (
                                                    <div
                                                        key={day}
                                                        className="py-3 text-center text-xs font-semibold text-slate-500"
                                                    >
                                                        {day}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}

                                    <div
                                        className={`grid ${view === "Day"
                                                ? "grid-cols-1"
                                                : "grid-cols-7"
                                            }`}
                                    >
                                        {visibleDays.map((date, index) => {
                                            const key = getDateKey(date);
                                            const dayTasks = tasksByDate[key] || [];
                                            const isToday = key === todayKey;
                                            const isCurrentMonth =
                                                date.getMonth() === month;

                                            return (
                                                <div
                                                    key={key}
                                                    className={`min-h-28 border-b border-r border-slate-100 p-2 sm:min-h-32 ${view === "Day" ? "min-h-80" : ""
                                                        } ${view === "Month" && !isCurrentMonth
                                                            ? "bg-slate-50/70"
                                                            : ""
                                                        }`}
                                                >
                                                    <div className="mb-2 flex items-center justify-between">
                                                        <span
                                                            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${isToday
                                                                    ? "bg-indigo-600 text-white"
                                                                    : isCurrentMonth || view !== "Month"
                                                                        ? "text-slate-700"
                                                                        : "text-slate-300"
                                                                }`}
                                                        >
                                                            {view === "Day"
                                                                ? formatDate(date, {
                                                                    weekday: "short",
                                                                    day: "numeric",
                                                                })
                                                                : date.getDate()}
                                                        </span>

                                                        {dayTasks.length > 0 && (
                                                            <span className="text-[10px] text-slate-400">
                                                                {dayTasks.length} task
                                                                {dayTasks.length !== 1 ? "s" : ""}
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="space-y-1.5">
                                                        {dayTasks
                                                            .slice(
                                                                0,
                                                                view === "Month" ? 3 : 12
                                                            )
                                                            .map((task) => {
                                                                const color = getTaskColor(
                                                                    task,
                                                                    todayKey
                                                                );

                                                                return (
                                                                    <button
                                                                        type="button"
                                                                        key={String(task._id)}
                                                                        title={`${task.title} — ${task.projectName || "Project"}`}
                                                                        onClick={() =>
                                                                            setSelectedTask(task)
                                                                        }
                                                                        className={`block w-full truncate rounded-r-md border-l-[3px] px-1.5 py-1.5 text-left text-[10px] font-medium transition hover:brightness-95 sm:text-xs ${color.event}`}
                                                                    >
                                                                        <span className="flex items-center gap-1.5">
                                                                            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${color.dot}`} />
                                                                            <span className="truncate">
                                                                                {task.title}
                                                                            </span>
                                                                        </span>
                                                                        {view !== "Month" && (
                                                                            <span className="mt-1 block truncate pl-3 text-[10px] opacity-75">
                                                                                {task.projectName || "Project"} · {task.status || "No status"}
                                                                            </span>
                                                                        )}
                                                                    </button>
                                                                );
                                                            })}

                                                        {dayTasks.length >
                                                            (view === "Month" ? 3 : 12) && (
                                                                <p className="px-1 text-[10px] text-slate-400">
                                                                    +{dayTasks.length -
                                                                        (view === "Month" ? 3 : 12)} more
                                                                </p>
                                                            )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-xs text-slate-400">
                                <span>
                                    {filteredTasks.length} task
                                    {filteredTasks.length !== 1 ? "s" : ""} with due dates
                                </span>
                                <span>Click a task to view its details</span>
                            </div>
                        </section>

                        {/* Right sidebar */}
                        <aside className="space-y-4">

                            {/* Quick actions */}
                            <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
                                <div className="mb-4 flex items-center gap-2">
                                    <Zap size={17} className="text-indigo-600" />
                                    <h2 className="text-sm font-bold">
                                        Quick Actions
                                    </h2>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedProject("all");
                                        setView("Day");
                                        goToToday();
                                    }}
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                                >
                                    <ListTodo size={17} />
                                    View Today's Tasks
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedProject("all");
                                        setView("Month");
                                        goToToday();
                                    }}
                                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-700 transition hover:bg-indigo-100"
                                >
                                    <CalendarDays size={17} />
                                    Go to Today
                                </button>
                            </section>

                            {/* Mini calendar */}
                            <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-sm font-bold">
                                        {monthLabel}
                                    </h2>
                                    <div className="flex items-center gap-1">
                                        <button
                                            type="button"
                                            aria-label="Previous month"
                                            onClick={() => navigate(-1)}
                                            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                                        >
                                            <ChevronLeft size={17} />
                                        </button>
                                        <button
                                            type="button"
                                            aria-label="Next month"
                                            onClick={() => navigate(1)}
                                            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                                        >
                                            <ChevronRight size={17} />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-7">
                                    {["S", "M", "T", "W", "T", "F", "S"].map(
                                        (day, index) => (
                                            <span
                                                key={`${day}-${index}`}
                                                className="py-2 text-center text-[10px] font-semibold text-slate-400"
                                            >
                                                {day}
                                            </span>
                                        )
                                    )}

                                    {miniCalendarDays.map((day) => {
                                        const hasTasks = Boolean(
                                            tasksByDate[day.key]?.length
                                        );

                                        const isSelected =
                                            getDateKey(selectedDate) === day.key;

                                        return (
                                            <button
                                                type="button"
                                                key={day.key}
                                                onClick={() =>
                                                    selectMiniDate(day.date)
                                                }
                                                className={`relative mx-auto flex h-8 w-8 items-center justify-center rounded-full text-xs transition ${isSelected
                                                        ? "bg-indigo-600 font-semibold text-white"
                                                        : day.key === todayKey
                                                            ? "border border-indigo-500 font-semibold text-indigo-600"
                                                            : day.inMonth
                                                                ? "text-slate-700 hover:bg-indigo-50"
                                                                : "text-slate-300 hover:bg-slate-50"
                                                    }`}
                                            >
                                                {day.date.getDate()}
                                                {hasTasks && !isSelected && (
                                                    <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-indigo-500" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* Upcoming tasks */}
                            <section className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                                <div className="flex items-center justify-between border-b border-slate-100 p-4">
                                    <div>
                                        <h2 className="text-sm font-bold">
                                            Upcoming
                                        </h2>
                                        <p className="mt-1 text-xs text-slate-400">
                                            Your next deadlines
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setCurrentDate(new Date());
                                            setView("Week");
                                        }}
                                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                                    >
                                        This week
                                    </button>
                                </div>

                                {upcomingTasks.length === 0 ? (
                                    <div className="px-4 py-8 text-center">
                                        <CheckCircle2
                                            size={28}
                                            className="mx-auto text-emerald-500"
                                        />
                                        <p className="mt-2 text-sm font-medium">
                                            All caught up!
                                        </p>
                                        <p className="mt-1 text-xs text-slate-400">
                                            No upcoming unfinished tasks.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="px-3 py-1">
                                        {upcomingTasks.map((task) => {
                                            const color = getTaskColor(
                                                task,
                                                todayKey
                                            );

                                            return (
                                                <button
                                                    type="button"
                                                    key={String(task._id)}
                                                    onClick={() =>
                                                        setSelectedTask(task)
                                                    }
                                                    className="flex w-full items-start gap-3 border-b border-slate-100 px-2 py-3 text-left last:border-0 hover:bg-slate-50"
                                                >
                                                    <span
                                                        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${color.dot}`}
                                                    />

                                                    <span className="min-w-0 flex-1">
                                                        <span className="block truncate text-xs font-semibold text-slate-700">
                                                            {task.title}
                                                        </span>
                                                        <span className="mt-1 block truncate text-[11px] text-slate-400">
                                                            {task.projectName || "Project"}
                                                        </span>
                                                        <span className="mt-1.5 flex items-center gap-1 text-[11px] text-slate-500">
                                                            <Clock3 size={11} />
                                                            {getDateKey(task.dueDate) === todayKey
                                                                ? "Today"
                                                                : formatDate(task.dueDate, {
                                                                    month: "short",
                                                                    day: "numeric",
                                                                })}
                                                        </span>
                                                    </span>

                                                    <ArrowUpRight
                                                        size={15}
                                                        className="mt-1 shrink-0 text-slate-400"
                                                    />
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </section>
                        </aside>
                    </div>
                )}
            </div>

            {/* Task details dialog */}
            {selectedTask && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
                    onClick={() => setSelectedTask(null)}
                >
                    <section
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="calendar-task-title"
                        onClick={(event) => event.stopPropagation()}
                        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                                    Task details
                                </p>
                                <h2
                                    id="calendar-task-title"
                                    className="mt-2 text-xl font-bold text-slate-800"
                                >
                                    {selectedTask.title}
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={() => setSelectedTask(null)}
                                aria-label="Close task details"
                                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                            >
                                <X size={19} />
                            </button>
                        </div>

                        {selectedTask.description && (
                            <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                                {selectedTask.description}
                            </p>
                        )}

                        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <DetailItem
                                label="Project"
                                value={selectedTask.projectName || "Unknown project"}
                            />
                            <DetailItem
                                label="Due date"
                                value={formatDate(selectedTask.dueDate, {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            />
                            <DetailItem
                                label="Status"
                                value={selectedTask.status || "Not set"}
                            />
                            <DetailItem
                                label="Priority"
                                value={selectedTask.priority || "Not set"}
                            />
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                type="button"
                                onClick={() => setSelectedTask(null)}
                                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                            >
                                Close
                            </button>
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
};

const SummaryCard = ({ label, value, note, icon: Icon, color }) => {
    const colorClasses = {
        indigo: "bg-indigo-100 text-indigo-600",
        emerald: "bg-emerald-100 text-emerald-600",
        rose: "bg-rose-100 text-rose-600",
        blue: "bg-blue-100 text-blue-600",
    };

    return (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs font-medium text-slate-500">
                        {label}
                    </p>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-slate-800">
                        {value}
                    </p>
                    <p className="mt-2 text-[11px] text-slate-400">
                        {note}
                    </p>
                </div>

                <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${colorClasses[color]}`}
                >
                    <Icon size={21} />
                </div>
            </div>
        </div>
    );
};

const Legend = ({ color, label }) => (
    <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${color}`} />
        <span className="text-[11px] text-slate-500">{label}</span>
    </div>
);

const DetailItem = ({ label, value }) => (
    <div className="rounded-xl bg-slate-50 p-3">
        <p className="text-xs text-slate-400">{label}</p>
        <p className="mt-2 break-words text-sm font-semibold text-slate-700">
            {value}
        </p>
    </div>
);

export default Calendar;
