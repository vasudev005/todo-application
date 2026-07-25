import { motion } from 'framer-motion';

const PageHeader = ({
  eyebrow,
  title,
  description,
  action,
}) => (

  <motion.div

    initial={{
      opacity: 0,
      y: 16,
    }}

    animate={{
      opacity: 1,
      y: 0,
    }}

    transition={{
      duration: 0.25,
    }}

    className="

      relative

      overflow-hidden

  

      flex
      flex-col
      gap-3

      

      p-0
      lg:flex-row
      lg:items-end
      lg:justify-between
    "
  >

    {/* BACKGROUND GLOW */}

    <div
      className="
        pointer-events-none

        absolute
        right-0
        top-0

        h-32
        w-32

        rounded-full

        bg-brand-400/10

        blur-3xl
      "
    />

    {/* CONTENT */}

    <div className="relative z-10">

      {/* EYEBROW */}

      {eyebrow && (

        <p
          className="
            mb-3

            text-xs
            font-semibold
            uppercase

            tracking-[0.3em]

            text-brand-600
          "
        >

          {eyebrow}

        </p>

      )}

      {/* TITLE */}

      <h1
        className="
          text-2xl
          font-black

          tracking-tight

          text-slate-900
          dark:text-white

          md:text-3xl
        "
      >

        {title}

      </h1>

      {/* DESCRIPTION */}

      {description && (

        <p
          className="
            mt-1.5

            max-w-2xl

            text-sm
            leading-6

            text-slate-500
            dark:text-slate-300

            md:text-sm
          "
        >

          {description}

        </p>

      )}

    </div>

    {/* ACTION */}

    {action ? (

      <div
        className="
          relative
          z-10

          flex
          items-center

          lg:self-end
        "
      >

        {action}

      </div>

    ) : null}

  </motion.div>
);

export default PageHeader;