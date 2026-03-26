import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router";
import { useGetCurrentUserQuery } from "../API/apiSlice";
import { setCredentials } from "../Store/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, accessToken, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const {
    data: profile,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetCurrentUserQuery(accessToken, {
    skip: !accessToken,
  });

  useEffect(() => {
    if (profile && accessToken) {
      dispatch(
        setCredentials({
          user: profile,
          accessToken,
        }),
      );
    }
  }, [accessToken, dispatch, profile]);

  if (!isAuthenticated || !accessToken) {
    return <Navigate to="/login" replace />;
  }

  const currentUser = profile ?? user;

  if (!currentUser && isLoading) {
    return (
      <section className="container px-4 py-6 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-5xl rounded-3xl bg-slate-50 p-8 shadow-sm">
          <p className="text-lg font-medium text-slate-700">
            Loading profile...
          </p>
        </div>
      </section>
    );
  }

  if (isError && !currentUser) {
    return (
      <section className="container  px-4 py-6 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-5xl rounded-3xl border border-red-200 bg-red-50 p-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Profile unavailable
          </h1>
          <p className="mt-3 text-sm text-red-700">
            {error?.data?.message ??
              "We could not load your profile right now."}
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-xl bg-brand px-5 py-3 font-semibold text-white"
          >
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  const fullName =
    `${currentUser?.firstName ?? ""} ${currentUser?.lastName ?? ""}`.trim() ||
    currentUser?.username ||
    "User";

  const infoCards = [
    { label: "Username", value: currentUser?.username ?? "N/A" },
    { label: "Email", value: currentUser?.email ?? "N/A" },
    { label: "Phone", value: currentUser?.phone ?? "N/A" },
    { label: "Gender", value: currentUser?.gender ?? "N/A" },
    { label: "Birth Date", value: currentUser?.birthDate ?? "N/A" },
    { label: "Blood Group", value: currentUser?.bloodGroup ?? "N/A" },
    { label: "University", value: currentUser?.university ?? "N/A" },
    { label: "Company", value: currentUser?.company?.name ?? "N/A" },
    { label: "Department", value: currentUser?.company?.department ?? "N/A" },
    { label: "Address", value: currentUser?.address?.address ?? "N/A" },
  ];

  return (
    <section className="container px-4 py-6 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-5xl mt-12 mb-12 overflow-hidden rounded-[1.5rem] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:rounded-[2rem]">
        <div className="bg-gradient-to-r  from-brand via-sky-500 to-cyan-400 px-4 py-8 text-white sm:px-6 sm:py-10 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
              <img
                src={currentUser?.image}
                alt={fullName}
                className="h-20 w-20 rounded-full border-4 border-white/40 object-cover bg-white/20 sm:h-24 sm:w-24"
              />
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-white/75">
                  User Profile
                </p>
                <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
                  {fullName}
                </h1>
                <p className="mt-2 text-sm text-white/85">
                  {currentUser?.email}
                </p>
              </div>
            </div>
            <div className="w-full rounded-2xl bg-white/15 px-4 py-4 backdrop-blur-sm sm:w-auto sm:px-5">
              <p className="text-xs uppercase tracking-[0.25em] text-white/70">
                Status
              </p>
              <p className="mt-2 text-lg font-semibold">
                {isFetching ? "Refreshing profile..." : "Signed in"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 px-4 py-6 sm:gap-5 sm:px-6 sm:py-8 md:grid-cols-2 lg:px-8">
          {infoCards.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                {item.label}
              </p>
              <p className="mt-3 text-base font-semibold text-slate-900">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Profile;
