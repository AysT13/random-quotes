export default function SignUpPage() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-gray-400 dark:bg-gray-700/70">
      <div
        className="w-full max-w-sm rounded-xl border border-slate-300 bg-gray-100 p-4 shadow-md
                      dark:border-slate-700 dark:bg-gray-900"
      >
        {/* <h1 className="font-bold text-2xl text-slate-700 text-center p-1"> */}
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-300 text-center mb-3">
          SignUp
        </h1>
        <form>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1 text-slate-600 dark:text-slate-300"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              required
              className="w-full rounded-lg border border-slate-400 px-3 py-2 mb-4 bg-gray-300
                         dark:bg-gray-700 dark:text-white dark:border-slate-800"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1 text-slate-600 dark:text-slate-300"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              required
              className="w-full rounded-lg border border-slate-400 px-3 py-2 bg-gray-300
                         dark:bg-gray-700 dark:text-white mb-8 dark:border-slate-800"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg px-4 py-2 font-medium border
                  bg-gray-400 hover:bg-gray-500
                  dark:bg-slate-700 dark:hover:bg-slate-800 dark:hover:border-slate-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
