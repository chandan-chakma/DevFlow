
import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    Activity as ActivityIcon,
    CalendarDays,
    CheckCircle2,
    ChevronDown,
    CircleAlert,
    Clock3,
    FolderKanban,
    MessageSquare,
    PencilLine,
    Plus,
    RefreshCw,
    Search,
    Trash2,
    Users,
    ClipboardCheck,
    FolderPlus,
} from "lucide-react";

// Use the same axiosSecure import path as your other pages.
import UseAxiosSecures from "../../../Hooks/UseAxiosSecures.jsx";

const activityTypes = {
    created: {
        label: "Created",
        icon: Plus,
        color: "bg-success/10 text-success",
    },
    status: {
        label: "Status updated",
        icon: PencilLine,
        color: "bg-info/10 text-info",
    },
    updated: {
        label: "Updated",
        icon: PencilLine,
        color: "bg-info/10 text-info",
    },
    deleted: {
        label: "Deleted",
        icon: Trash2,
        color: "bg-error/10 text-error",
    },
    commented: {
        label: "Comment",
        icon: MessageSquare,
        color: "bg-primary/10 text-primary",
    },
    completed: {
        label: "Completed",
        icon: CheckCircle2,
        color: "bg-success/10 text-success",
    },
    member_added: {
        label: "Member added",
        icon: Users,
        color: "bg-secondary/10 text-secondary",
    },
};

const getActivityConfig = (activity) => {
    const action = (activity.action || "").toLowerCase();

    if (action === "created" && activity.entityType === "project") {
        return {
            label: "Project created",
            icon: FolderPlus,
            color: "bg-primary/10 text-primary",
        };
    }

    return activityTypes[action] || {
        label: action
            ? action.charAt(0).toUpperCase() + action.slice(1)
            : "Activity",
        icon: ActivityIcon,
        color: "bg-base-200 text-base-content/70",
    };
};

const formatRelativeTime = (dateValue) => {
    if (!dateValue) return "Unknown time";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "Unknown time";
    }

    const seconds = Math.max(
        0,
        Math.floor((Date.now() - date.getTime()) / 1000)
    );

    if (seconds < 60) return "Just now";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes}m ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours}h ago`;
    }

    const days = Math.floor(hours / 24);
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;

    return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year:
            date.getFullYear() !== new Date().getFullYear()
                ? "numeric"
                : undefined,
    });
};

const getActorName = (activity) =>
    activity.performedBy?.name || "A team member";

const Activity = () => {
    const axiosSecure = UseAxiosSecures();
    const [activeFilter, setActiveFilter] = useState("all");
    const [searchText, setSearchText] = useState("");
    const [selectedProject, setSelectedProject] = useState("all");
    const [dateRange, setDateRange] = useState("7");

    // Load activities for the selected feed.
    const {
        data: activities = [],
        isLoading: activitiesLoading,
        isError: activitiesError,
        refetch: refetchActivities,
    } = useQuery({
        queryKey: ["activities", activeFilter],
        queryFn: async () => {
            const params =
                activeFilter === "all"
                    ? {}
                    : { filter: activeFilter };

            const res = await axiosSecure.get("/activities", {
                params,
            });

            return Array.isArray(res.data) ? res.data : [];
        },
    });

    // ProjectModel.findAllProjects returns { projects, total, statusCounts }.
    const {
        data: projects = [],
        isError: projectsError,
    } = useQuery({
        queryKey: ["projects"],
        queryFn: async () => {
            const res = await axiosSecure.get("/projects");

            if (Array.isArray(res.data)) {
                return res.data;
            }

            return res.data?.projects || [];
        },
    });

    const projectMap = useMemo(() => {
        return new Map(
            projects.map((project) => [
                String(project._id),
                project.name,
            ])
        );
    }, [projects]);

    const filteredActivities = useMemo(() => {
        const normalizedSearch = searchText.trim().toLowerCase();
        const now = Date.now();

        return activities.filter((item) => {
            const projectId = String(item.projectId || "");
            const projectName =
                projectMap.get(projectId) || "Project";

            const actorName = getActorName(item);
            const description = item.description || "";
            const taskTitle = item.taskTitle || "";

            const matchesSearch = [
                actorName,
                description,
                taskTitle,
                projectName,
            ].some((value) =>
                value.toLowerCase().includes(normalizedSearch)
            );

            const matchesProject =
                selectedProject === "all" ||
                projectId === selectedProject;

            let matchesDate = true;

            if (dateRange !== "all") {
                const createdAt = new Date(item.createdAt).getTime();
                const days = Number(dateRange);
                const cutoff = now - days * 24 * 60 * 60 * 1000;

                matchesDate =
                    !Number.isNaN(createdAt) &&
                    createdAt >= cutoff;
            }

            return (
                matchesSearch &&
                matchesProject &&
                matchesDate
            );
        });
    }, [
        activities,
        projectMap,
        searchText,
        selectedProject,
        dateRange,
    ]);

    const filters = [
        { id: "all", label: "All Activity", icon: ActivityIcon },
        { id: "my", label: "My Activity", icon: ClipboardCheck },
        { id: "team", label: "Team Activity", icon: Users },
    ];

    return (
        <div className="min-h-full bg-base-200/40 px-4 py-6 md:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6">

                {/* Page header */}
                <div>
                    <div className="mb-2 flex items-center gap-2 text-sm text-base-content/50">
                        <FolderKanban size={15} />
                        <span>Workspace</span>
                        <span>/</span>
                        <span>Activity</span>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                                Activity
                            </h1>

                            <p className="mt-2 text-sm text-base-content/60 md:text-base">
                                Stay updated with what's happening in your projects.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => refetchActivities()}
                            className="btn btn-outline btn-sm gap-2 self-start"
                        >
                            <RefreshCw size={15} />
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Activity tabs */}
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                        {filters.map((filter) => {
                            const Icon = filter.icon;
                            const isActive =
                                activeFilter === filter.id;

                            return (
                                <button
                                    key={filter.id}
                                    type="button"
                                    onClick={() =>
                                        setActiveFilter(filter.id)
                                    }
                                    className={`btn btn-sm rounded-full ${isActive
                                            ? "btn-primary"
                                            : "btn-ghost border border-base-300 bg-base-100"
                                        }`}
                                >
                                    <Icon size={15} />
                                    {filter.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Project and date filters */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <label className="select select-bordered flex items-center gap-2 bg-base-100">
                            <FolderKanban
                                size={16}
                                className="shrink-0 text-base-content/50"
                            />

                            <select
                                className="grow"
                                value={selectedProject}
                                onChange={(event) =>
                                    setSelectedProject(event.target.value)
                                }
                            >
                                <option value="all">
                                    All Projects
                                </option>

                                {projects.map((project) => (
                                    <option
                                        key={String(project._id)}
                                        value={String(project._id)}
                                    >
                                        {project.name}
                                    </option>
                                ))}
                            </select>

                            <ChevronDown
                                size={14}
                                className="pointer-events-none text-base-content/50"
                            />
                        </label>

                        <label className="select select-bordered flex items-center gap-2 bg-base-100">
                            <CalendarDays
                                size={16}
                                className="shrink-0 text-base-content/50"
                            />

                            <select
                                className="grow"
                                value={dateRange}
                                onChange={(event) =>
                                    setDateRange(event.target.value)
                                }
                            >
                                <option value="7">Last 7 days</option>
                                <option value="30">Last 30 days</option>
                                <option value="all">All time</option>
                            </select>

                            <ChevronDown
                                size={14}
                                className="pointer-events-none text-base-content/50"
                            />
                        </label>
                    </div>
                </div>

                {/* Search */}
                <label className="input input-bordered flex w-full items-center gap-2 bg-base-100">
                    <Search
                        size={18}
                        className="text-base-content/40"
                    />

                    <input
                        type="text"
                        className="grow"
                        placeholder="Search activities, people, or projects..."
                        value={searchText}
                        onChange={(event) =>
                            setSearchText(event.target.value)
                        }
                    />
                </label>

                {/* Activity feed heading */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="font-semibold">
                            Recent activity
                        </h2>

                        <p className="mt-1 text-sm text-base-content/50">
                            {activitiesLoading
                                ? "Loading activities..."
                                : `${filteredActivities.length} ${filteredActivities.length === 1
                                    ? "activity"
                                    : "activities"
                                }`}
                        </p>
                    </div>
                </div>

                {/* Loading */}
                {activitiesLoading && (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100 py-16">
                        <span className="loading loading-spinner loading-lg text-primary" />
                        <p className="mt-4 text-sm text-base-content/60">
                            Loading activity feed...
                        </p>
                    </div>
                )}

                {/* Error */}
                {activitiesError && (
                    <div className="rounded-2xl border border-error/20 bg-base-100 p-8 text-center">
                        <CircleAlert
                            size={34}
                            className="mx-auto text-error"
                        />

                        <h3 className="mt-3 font-semibold">
                            Couldn't load activities
                        </h3>

                        <p className="mt-2 text-sm text-base-content/60">
                            Check your connection and authentication, then try again.
                        </p>

                        <button
                            type="button"
                            onClick={() => refetchActivities()}
                            className="btn btn-primary btn-sm mt-4"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {/* Feed */}
                {!activitiesLoading &&
                    !activitiesError &&
                    filteredActivities.length > 0 && (
                        <div className="overflow-hidden rounded-2xl border border-base-300/70 bg-base-100 shadow-sm">
                            {filteredActivities.map((item) => {
                                const config = getActivityConfig(item);
                                const Icon = config.icon;

                                const projectName =
                                    projectMap.get(
                                        String(item.projectId || "")
                                    ) || "Project";

                                const actorName = getActorName(item);

                                return (
                                    <article
                                        key={String(item._id)}
                                        className="flex flex-col gap-3 border-b border-base-200 px-4 py-4 last:border-b-0 sm:flex-row sm:items-center sm:gap-4 sm:px-5"
                                    >
                                        {/* Actor avatar */}
                                        <div className="flex shrink-0 items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                                                {actorName
                                                    .trim()
                                                    .split(/\s+/)
                                                    .slice(0, 2)
                                                    .map((part) => part[0])
                                                    .join("")
                                                    .toUpperCase()}
                                            </div>

                                            <div
                                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.color}`}
                                            >
                                                <Icon size={18} />
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-semibold text-base-content">
                                                {actorName}
                                            </p>

                                            <p className="mt-1 break-words text-sm text-base-content/80">
                                                {item.description ||
                                                    "Performed an activity"}
                                            </p>

                                            {item.taskTitle &&
                                                item.description !==
                                                item.taskTitle && (
                                                    <p className="mt-1 text-xs text-base-content/50">
                                                        Task: {item.taskTitle}
                                                    </p>
                                                )}
                                        </div>

                                        {/* Project */}
                                        <div className="sm:w-44 sm:shrink-0">
                                            <span className="inline-flex max-w-full items-center gap-1.5 rounded-lg bg-primary/5 px-2.5 py-1.5 text-xs font-medium text-primary">
                                                <FolderKanban
                                                    size={13}
                                                    className="shrink-0"
                                                />

                                                <span className="truncate">
                                                    {projectName}
                                                </span>
                                            </span>
                                        </div>

                                        {/* Timestamp */}
                                        <div className="flex shrink-0 items-center gap-1.5 text-xs text-base-content/50 sm:w-28 sm:justify-end">
                                            <Clock3 size={13} />
                                            {formatRelativeTime(
                                                item.createdAt
                                            )}
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}

                {/* Empty state */}
                {!activitiesLoading &&
                    !activitiesError &&
                    filteredActivities.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-base-300 bg-base-100 px-5 py-16 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <ActivityIcon size={26} />
                            </div>

                            <h3 className="mt-4 text-lg font-semibold">
                                No activity found
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm text-base-content/60">
                                There are no activities matching your current filters.
                                Try another feed, project, or date range.
                            </p>

                            <button
                                type="button"
                                onClick={() => {
                                    setSearchText("");
                                    setSelectedProject("all");
                                    setDateRange("7");
                                }}
                                className="btn btn-outline btn-sm mt-4"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}

                {projectsError && (
                    <p className="text-xs text-base-content/50">
                        Project names couldn't be loaded. Activity records will still be displayed.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Activity;
