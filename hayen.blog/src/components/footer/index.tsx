export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 antialiased">
      <div className="p-4 mx-auto max-w-screen-xl">
        <div className="text-center">
          <span
            data-tooltip-target="tooltip-about-me"
            className="block text-sm text-center text-gray-500 dark:text-gray-400"
          >
            © 2024 -{" "}
            <a
              href="#"
              className=" hover:underlinetransititext-primary text-primary transition duration-50 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
              title="Hi! I'm hayen"
            >
              hanguyentieuyen
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
