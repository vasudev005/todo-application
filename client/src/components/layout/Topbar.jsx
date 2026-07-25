import { useMemo, useState } from 'react';

import {
  Bell,
  ChevronDown,
  ChevronUp,
  Menu,
  Moon,
  Search,
  Sun,
  X,
} from 'lucide-react';

import {
  motion,
  AnimatePresence,
} from 'framer-motion';

import { useTasks } from '../../contexts/TaskContext';

import { useTheme } from '../../contexts/ThemeContext';

import { useAuth } from '../../contexts/AuthContext';

const Topbar = ({
  onMenuClick,
}) => {

  const {
    searchTerm,
    setSearchTerm,
    notifications,
  } = useTasks();

  const {
    theme,
    toggleTheme,
  } = useTheme();

  const {
    user,
    logout,
  } = useAuth();

  const [open, setOpen] =
    useState(false);

  const [
    notificationsOpen,
    setNotificationsOpen,
  ] = useState(false);

  // UNREAD COUNT

  const unread = useMemo(
    () =>

      notifications.filter(
        (item) => !item.read
      ).length,

    [notifications]
  );

  return (

    <div
      className="
        flex
        items-center
        justify-between

        gap-3
      "
    >

      {/* LEFT */}

      <div
        className="
          flex
          items-center
          gap-3

          flex-1
          min-w-0
        "
      >

        {/* MOBILE MENU */}

        <button
          className="
            btn-secondary
            md:hidden
          "

          onClick={onMenuClick}
        >

          <Menu className="h-4 w-4" />

        </button>

        {/* SEARCH */}

        <div
          className="
            relative

            flex-1

            max-w-[720px]
          "
        >

          <Search
            className="
              pointer-events-none

              absolute
              left-4
              top-1/2

              h-4
              w-4

              -translate-y-1/2

              text-slate-400
            "
          />

          <input
            className="
              input-primary
              pl-11
            "

            placeholder="
              Search tasks,
              labels,
              priorities...
            "

            value={searchTerm}

            onChange={(event) =>
              setSearchTerm(
                event.target.value
              )
            }
          />

        </div>

      </div>

      {/* RIGHT */}

      <div
        className="
          flex
          items-center
          gap-3

          flex-shrink-0
        "
      >

        {/* THEME */}

        <button
          onClick={toggleTheme}

          className="
            btn-secondary
            !px-3
          "
        >

          {theme === 'dark'

            ? (
              <Sun className="h-4 w-4" />
            )

            : (
              <Moon className="h-4 w-4" />
            )}

        </button>

        {/* NOTIFICATIONS */}

        <div className="relative">

          <button
            onClick={() =>
              setNotificationsOpen(
                (prev) => !prev
              )
            }

            className="
              btn-secondary

              relative

              !px-3
            "
          >

            <Bell className="h-4 w-4" />

            {unread > 0 && (

              <span
                className="
                  absolute
                  -right-1
                  -top-1

                  flex
                  h-5
                  min-w-5

                  items-center
                  justify-center

                  rounded-full

                  bg-rose-500

                  px-1

                  text-xs
                  text-white
                "
              >

                {unread}

              </span>

            )}

          </button>

          {/* DROPDOWN */}

          <AnimatePresence>

            {notificationsOpen ? (

              <motion.div

                initial={{
                  opacity: 0,
                  y: -8,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                exit={{
                  opacity: 0,
                  y: -8,
                }}

                className="
                  absolute
                  right-0
                  z-50
                  mt-3

                  w-[340px]

                  overflow-hidden

                  rounded-3xl

                  border
                  border-white/40

                  bg-white/95

                  shadow-glass

                  dark:border-white/10
                  dark:bg-slate-900/95
                "
              >

                {/* HEADER */}

                <div
                  className="
                    flex
                    items-center
                    justify-between

                    border-b
                    border-slate-200

                    px-5
                    py-4

                    dark:border-slate-800
                  "
                >

                  <h3
                    className="
                      text-sm
                      font-semibold

                      text-slate-900
                      dark:text-white
                    "
                  >

                    Notifications

                  </h3>

                  <button
                    onClick={() =>
                      setNotificationsOpen(
                        false
                      )
                    }
                  >

                    <X
                      className="
                        h-4
                        w-4

                        text-slate-400
                      "
                    />

                  </button>

                </div>

                {/* LIST */}

                <div
                  className="
                    max-h-[320px]

                    overflow-y-auto
                  "
                >

                  {notifications.length ? (

                    notifications.map(
                      (item) => (

                        <div
                          key={item._id}

                          className="
                            border-b
                            border-slate-100

                            px-5
                            py-4

                            transition

                            hover:bg-slate-50

                            dark:border-slate-800
                            dark:hover:bg-slate-800/50
                          "
                        >

                          <p
                            className="
                              text-sm
                              font-medium

                              text-slate-900
                              dark:text-white
                            "
                          >

                            {item.title}

                          </p>

                          <p
                            className="
                              mt-1

                              text-xs

                              text-slate-500
                              dark:text-slate-300
                            "
                          >

                            {item.message}

                          </p>

                        </div>

                      )
                    )

                  ) : (

                    <div
                      className="
                        px-5
                        py-10

                        text-center
                        text-sm

                        text-slate-500
                        dark:text-slate-300
                      "
                    >

                      No notifications yet.

                    </div>

                  )}

                </div>

              </motion.div>

            ) : null}

          </AnimatePresence>

        </div>

        {/* PROFILE */}

        <div className="relative">

          <button
            onClick={() =>
              setOpen(
                (prev) => !prev
              )
            }

            className="
              flex
              items-center
              gap-3

              rounded-2xl

              border
              border-white/40

              bg-white/80

              px-3
              py-2

              transition

              hover:scale-[1.02]

              dark:border-white/10
              dark:bg-slate-900/70
            "
          >

            <img
              src={
                user?.avatarUrl ||

                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user?.name ||
                  'AI User'
                )}&background=ede9fe&color=5b21b6`
              }

              alt={user?.name}

              className="
                h-10
                w-10

                rounded-2xl
                object-cover
              "
            />

            <div
              className="
                hidden

                text-left

                md:block
              "
            >

              <p
                className="
                  text-sm
                  font-semibold

                  text-slate-900
                  dark:text-white
                "
              >

                {user?.name}

              </p>

              <p
                className="
                  text-xs

                  text-slate-500
                  dark:text-slate-300
                "
              >

                Focused member

              </p>

            </div>

            

          </button>

          
                

              
        </div>

      </div>

    </div>
  );
};

export default Topbar;