import React from "react";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-neutral-200 border-t border-neutral-300 py-4 text-center dark:bg-neutral-700 dark:border-neutral-600">
      <div className="text-neutral-600 dark:text-neutral-400">
        © 2023 Copyright:
        <a
          className="font-semibold text-neutral-600 dark:text-neutral-400 mt-2 inline-block lg:mt-0"
          href="/"
        >
          MY SHOP
        </a>
      </div>
    </footer>
  );
}
