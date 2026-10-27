
import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    Users,
    CalendarCheck,
    ChartNoAxesColumn,
    FolderKanban,
    Search,
    ChevronDown,
    Mail,
    CircleAlert,
    CheckCircle2,
    Clock3,
    BriefcaseBusiness,
    RefreshCw,
    UserRound,
} from "lucide-react";

// Adjust this path to match your project structure.
import UseAxiosSecures from "../../../Hooks/UseAxiosSecures.jsx";

const summaryCardConfig = [
    {
        label: "Total Members",
        key: "totalMembers",
        icon: Users,
        iconStyle: "bg-primary/10 text-primary",
    },
    {
        label: "Active Tasks",
        key: "activeTasks",
        icon: CalendarCheck,
        iconStyle: "bg-success/10 text-success",
    },
    {
        label: "Overdue Tasks",
        key: "overdueTasks",
        icon: ChartNoAxesColumn,
        iconStyle: "bg-error/10 text-error",
    },
    {
        label: "Projects",
        key: "totalProjects",
        icon: FolderKanban,
        iconStyle: "bg-info/10 text-info",
    },
];

const getInitials = (name = "") => {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
};

const getAvatarColor = (name = "") => {
    const colors = [
        "bg-primary/15 text-primary",
        "bg-secondary/15 text-secondary",
        "bg-success/15 text-success",
        "bg-warning/15 text-warning",
        "bg-info/15 text-info",
    ];

    const index = name
        .split("")
        .reduce((total, char) => total + char.charCodeAt(0), 0);

    return colors[index % colors.length];
};

const Team = () => {
    const axiosSecure = UseAxiosSecures();
    const [searchText, setSearchText] = useState("");
    const [selectedRole, setSelectedRole] = useState("All Roles");
    const [selectedProject, setSelectedProject] =
        useState("All Projects");

    // Fetch team summary.
    const {
        data: summary,
        isLoading: summaryLoading,
        isError: summaryError,
        refetch: refetchSummary,
    } = useQuery({
        queryKey: ["team-summary"],
        queryFn: async () => {
            const res = await axiosSecure.get("/team/summary");
            console.log(res)
            return res.data;
        },
    });

    // Fetch team members.
    const {
        data: teamMembers = [],
        isLoading: membersLoading,
        isError: membersError,
        refetch: refetchMembers,
    } = useQuery({
        queryKey: ["team-members"],
        queryFn: async () => {
            const res = await axiosSecure.get("/team/members");
            console.log(res)
            return res.data;
        },
    });

    // Build filter options from the real API response.
    const roles = useMemo(() => {
        const uniqueRoles = [
            ...new Set(
                teamMembers
                    .map((member) => member.role)
                    .filter(Boolean)
            ),
        ];

        return ["All Roles", ...uniqueRoles.sort()];
    }, [teamMembers]);

    const projects = useMemo(() => {
        const uniqueProjects = new Map();

        teamMembers.forEach((member) => {
            (member.projects || []).forEach((project) => {
                if (project?.id && project?.name) {
                    uniqueProjects.set(
                        String(project.id),
                        project
                    );
                }
            });
        });

        return [
            {
                id: "All Projects",
                name: "All Projects",
            },
            ...Array.from(uniqueProjects.values()).sort((a, b) =>
                a.name.localeCompare(b.name)
            ),
        ];
    }, [teamMembers]);

    // Search and filter members.
    const filteredMembers = useMemo(() => {
        const normalizedSearch = searchText.trim().toLowerCase();

        return teamMembers.filter((member) => {
            const name = member.name || "";
            const email = member.email || "";

            const matchesSearch =
                name.toLowerCase().includes(normalizedSearch) ||
                email.toLowerCase().includes(normalizedSearch);

            const matchesRole =
                selectedRole === "All Roles" ||
                member.role === selectedRole;

            const matchesProject =
                selectedProject === "All Projects" ||
                (member.projects || []).some(
                    (project) =>
                        String(project.id) === selectedProject
                );

            return (
                matchesSearch &&
                matchesRole &&
                matchesProject
            );
        });
    }, [
        teamMembers,
        searchText,
        selectedRole,
        selectedProject,
    ]);

    const handleRefresh = () => {
        refetchSummary();
        refetchMembers();
    };

    const isLoading = summaryLoading || membersLoading;
    const hasError = summaryError || membersError;

    return (
        <div className="min-h-screen bg-base-200/40 px-4 py-6 md:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-8">

                {/* Page heading */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm text-base-content/60">
                            <Users size={16} />
                            <span>Workspace</span>
                            <span>/</span>
                            <span>Team</span>
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-base-content md:text-3xl">
                            Team Members
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm text-base-content/60 md:text-base">
                            Manage your collaborators, explore shared
                            projects, and keep track of team progress.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleRefresh}
                        className="btn btn-outline btn-sm gap-2 self-start sm:self-auto"
                    >
                        <RefreshCw size={15} />
                        Refresh
                    </button>
                </div>

                {/* Summary cards */}
                <section>
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold">
                            Team Overview
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {summaryCardConfig.map((card) => {
                            const Icon = card.icon;
                            const value = summary?.[card.key] ?? 0;

                            return (
                                <div
                                    key={card.key}
                                    className="card border border-base-300/70 bg-base-100 shadow-sm transition-shadow hover:shadow-md"
                                >
                                    <div className="card-body p-5">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <p className="text-sm text-base-content/60">
                                                    {card.label}
                                                </p>

                                                <p className="mt-3 text-3xl font-bold tracking-tight">
                                                    {summaryLoading
                                                        ? "—"
                                                        : value}
                                                </p>
                                            </div>

                                            <div
                                                className={`rounded-xl p-3 ${card.iconStyle}`}
                                            >
                                                <Icon size={22} />
                                            </div>
                                        </div>

                                        {card.key === "overdueTasks" &&
                                            !summaryLoading &&
                                            value > 0 && (
                                                <p className="mt-2 flex items-center gap-1 text-xs text-error">
                                                    <CircleAlert size={13} />
                                                    Tasks need attention
                                                </p>
                                            )}

                                        {card.key === "activeTasks" &&
                                            !summaryLoading && (
                                                <p className="mt-2 text-xs text-base-content/50">
                                                    Tasks not yet completed
                                                </p>
                                            )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Member list heading */}
                <section className="space-y-5">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h2 className="text-xl font-bold">
                                Your Team
                            </h2>

                            <p className="mt-1 text-sm text-base-content/60">
                                {membersLoading
                                    ? "Loading team members..."
                                    : `${filteredMembers.length} ${filteredMembers.length === 1
                                        ? "member"
                                        : "members"
                                    } found`}
                            </p>
                        </div>
                    </div>

                    {/* Search and filters */}
                    <div className="grid grid-cols-1 gap-3 rounded-2xl border border-base-300/70 bg-base-100 p-4 shadow-sm md:grid-cols-3">
                        <label className="input input-bordered flex items-center gap-2">
                            <Search
                                size={18}
                                className="shrink-0 text-base-content/40"
                            />

                            <input
                                type="text"
                                className="grow"
                                placeholder="Search name or email..."
                                value={searchText}
                                onChange={(event) =>
                                    setSearchText(event.target.value)
                                }
                            />
                        </label>

                        <label className="select select-bordered flex w-full items-center gap-2">
                            <BriefcaseBusiness
                                size={17}
                                className="shrink-0 text-base-content/40"
                            />

                            <select
                                className="grow"
                                value={selectedRole}
                                onChange={(event) =>
                                    setSelectedRole(event.target.value)
                                }
                            >
                                {roles.map((role) => (
                                    <option key={role} value={role}>
                                        {role}
                                    </option>
                                ))}
                            </select>

                            <ChevronDown
                                size={15}
                                className="pointer-events-none text-base-content/40"
                            />
                        </label>

                        <label className="select select-bordered flex w-full items-center gap-2">
                            <FolderKanban
                                size={17}
                                className="shrink-0 text-base-content/40"
                            />

                            <select
                                className="grow"
                                value={selectedProject}
                                onChange={(event) =>
                                    setSelectedProject(event.target.value)
                                }
                            >
                                {projects.map((project) => (
                                    <option
                                        key={project.id}
                                        value={String(project.id)}
                                    >
                                        {project.name}
                                    </option>
                                ))}
                            </select>

                            <ChevronDown
                                size={15}
                                className="pointer-events-none text-base-content/40"
                            />
                        </label>
                    </div>

                    {/* Loading state */}
                    {membersLoading && (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-base-300/70 bg-base-100 py-16">
                            <span className="loading loading-spinner loading-lg text-primary" />

                            <p className="mt-4 text-sm text-base-content/60">
                                Loading your team...
                            </p>
                        </div>
                    )}

                    {/* Error state */}
                    {hasError && (
                        <div className="rounded-2xl border border-error/20 bg-base-100 p-8 text-center">
                            <CircleAlert
                                size={36}
                                className="mx-auto text-error"
                            />

                            <h3 className="mt-3 font-semibold">
                                Couldn't load team data
                            </h3>

                            <p className="mt-2 text-sm text-base-content/60">
                                Please check your connection and try again.
                            </p>

                            <button
                                type="button"
                                onClick={handleRefresh}
                                className="btn btn-primary btn-sm mt-4 gap-2"
                            >
                                <RefreshCw size={15} />
                                Try again
                            </button>
                        </div>
                    )}

                    {/* Member cards */}
                    {!membersLoading &&
                        !membersError &&
                        filteredMembers.length > 0 && (
                            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
                                {filteredMembers.map((member) => {
                                    const memberName =
                                        member.name || "Team Member";

                                    const memberProjects =
                                        member.projects || [];

                                    const unfinishedTasks =
                                        (member.openTasks || 0) +
                                        (member.inProgress || 0);

                                    return (
                                        <article
                                            key={String(member.id)}
                                            className="card border border-base-300/70 bg-base-100 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                                        >
                                            <div className="card-body gap-5 p-5">
                                                {/* Member profile */}
                                                <div className="flex items-start gap-3">
                                                    <div className="relative shrink-0">
                                                        {member.avatar ? (
                                                            <img
                                                                src={member.avatar}
                                                                alt={memberName}
                                                                className="h-14 w-14 rounded-2xl object-cover"
                                                                onError={(event) => {
                                                                    event.currentTarget.style.display =
                                                                        "none";
                                                                }}
                                                            />
                                                        ) : (
                                                            <div
                                                                className={`flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold ${getAvatarColor(memberName)}`}
                                                            >
                                                                {getInitials(
                                                                    memberName
                                                                ) || (
                                                                        <UserRound
                                                                            size={24}
                                                                        />
                                                                    )}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="min-w-0 flex-1">
                                                        <h3 className="truncate font-bold text-base-content">
                                                            {memberName}
                                                        </h3>

                                                        <p className="mt-1 text-sm text-base-content/60">
                                                            {member.role ||
                                                                "Member"}
                                                        </p>

                                                        {member.email && (
                                                            <p className="mt-2 flex min-w-0 items-center gap-1.5 text-xs text-base-content/50">
                                                                <Mail
                                                                    size={13}
                                                                    className="shrink-0"
                                                                />

                                                                <span className="truncate">
                                                                    {member.email}
                                                                </span>
                                                            </p>
                                                        )}
                                                    </div>

                                                    <span className="badge badge-ghost shrink-0">
                                                        {memberProjects.length}{" "}
                                                        {memberProjects.length ===
                                                            1
                                                            ? "project"
                                                            : "projects"}
                                                    </span>
                                                </div>

                                                <div className="divider my-0" />

                                                {/* Assigned task statistics */}
                                                <div>
                                                    <div className="mb-3 flex items-center justify-between">
                                                        <h4 className="text-sm font-semibold">
                                                            Assigned Tasks
                                                        </h4>

                                                        <span className="text-xs text-base-content/50">
                                                            {unfinishedTasks}{" "}
                                                            unfinished
                                                        </span>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div className="rounded-xl bg-base-200/70 p-3">
                                                            <div className="flex items-center gap-2 text-xs text-base-content/60">
                                                                <Clock3
                                                                    size={14}
                                                                />
                                                                To Do
                                                            </div>

                                                            <p className="mt-2 text-xl font-bold">
                                                                {member.openTasks ??
                                                                    0}
                                                            </p>
                                                        </div>

                                                        <div className="rounded-xl bg-info/10 p-3">
                                                            <div className="flex items-center gap-2 text-xs text-info">
                                                                <RefreshCw
                                                                    size={14}
                                                                />
                                                                In Progress
                                                            </div>

                                                            <p className="mt-2 text-xl font-bold">
                                                                {member.inProgress ??
                                                                    0}
                                                            </p>
                                                        </div>

                                                        <div className="rounded-xl bg-success/10 p-3">
                                                            <div className="flex items-center gap-2 text-xs text-success">
                                                                <CheckCircle2
                                                                    size={14}
                                                                />
                                                                Completed
                                                            </div>

                                                            <p className="mt-2 text-xl font-bold">
                                                                {member.completed ??
                                                                    0}
                                                            </p>
                                                        </div>

                                                        <div className="rounded-xl bg-error/10 p-3">
                                                            <div className="flex items-center gap-2 text-xs text-error">
                                                                <CircleAlert
                                                                    size={14}
                                                                />
                                                                Overdue
                                                            </div>

                                                            <p className="mt-2 text-xl font-bold">
                                                                {member.overdue ??
                                                                    0}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Shared projects */}
                                                <div>
                                                    <h4 className="mb-3 text-sm font-semibold">
                                                        Shared Projects
                                                    </h4>

                                                    {memberProjects.length >
                                                        0 ? (
                                                        <div className="flex flex-wrap gap-2">
                                                            {memberProjects
                                                                .slice(0, 3)
                                                                .map(
                                                                    (project) => (
                                                                        <span
                                                                            key={String(
                                                                                project.id
                                                                            )}
                                                                            className="badge badge-outline h-auto max-w-full whitespace-normal py-2"
                                                                        >
                                                                            <FolderKanban
                                                                                size={
                                                                                    12
                                                                                }
                                                                                className="mr-1 shrink-0"
                                                                            />

                                                                            <span className="break-all">
                                                                                {
                                                                                    project.name
                                                                                }
                                                                            </span>
                                                                        </span>
                                                                    )
                                                                )}

                                                            {memberProjects.length >
                                                                3 && (
                                                                    <span className="badge badge-ghost py-2">
                                                                        +
                                                                        {memberProjects.length -
                                                                            3}{" "}
                                                                        more
                                                                    </span>
                                                                )}
                                                        </div>
                                                    ) : (
                                                        <p className="text-xs text-base-content/50">
                                                            No shared projects
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        )}

                    {/* Empty state */}
                    {!membersLoading &&
                        !membersError &&
                        filteredMembers.length === 0 && (
                            <div className="rounded-2xl border border-dashed border-base-300 bg-base-100 px-4 py-16 text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-base-200 text-base-content/50">
                                    <Users size={26} />
                                </div>

                                <h3 className="mt-4 text-lg font-semibold">
                                    No team members found
                                </h3>

                                <p className="mx-auto mt-2 max-w-md text-sm text-base-content/60">
                                    {teamMembers.length === 0
                                        ? "No other members share your projects yet."
                                        : "Try changing your search or filters to find team members."}
                                </p>

                                {(searchText ||
                                    selectedRole !== "All Roles" ||
                                    selectedProject !== "All Projects") && (
                                        <button
                                            type="button"
                                            className="btn btn-outline btn-sm mt-4"
                                            onClick={() => {
                                                setSearchText("");
                                                setSelectedRole("All Roles");
                                                setSelectedProject(
                                                    "All Projects"
                                                );
                                            }}
                                        >
                                            Clear filters
                                        </button>
                                    )}
                            </div>
                        )}
                </section>
            </div>
        </div>
    );
};

export default Team;
