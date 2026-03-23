const BackgroundSvg = () => {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-10">
      <svg
        height="100%"
        viewBox="0 0 400 400"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 100 Q 100 0 200 100 T 400 100"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="20"
        ></path>
        <path
          d="M0 200 Q 100 100 200 200 T 400 200"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="20"
        ></path>
        <path
          d="M0 300 Q 100 200 200 300 T 400 300"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="20"
        ></path>
      </svg>
    </div>
  )
}

export default BackgroundSvg
