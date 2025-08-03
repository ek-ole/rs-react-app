import { Link } from 'react-router-dom';

import { cn } from '@/utils/cn';

function About() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4 md:p-14">
      <div
        className={cn(
          'mx-auto flex w-full max-w-4xl flex-col',
          'items-center rounded-xl border-4 p-4',
          'shadow-glow',
        )}
      >
        <h2 className="mb-6 text-center text-2xl font-bold">About the Project</h2>

        <div className="mb-8 space-y-4 text-center">
          <p>This is a React application for exploring Rick and Morty characters.</p>
          <p className="flex flex-wrap items-center justify-center">
            Created by Ekaterina Dmitrenko as part of&nbsp;
            <Link
              to="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center font-bold hover:underline"
            >
              RS School React Course
              <img
                src="/rss-logo.svg"
                alt="RS School"
                className="ml-2 h-5 w-5 transition-transform duration-300 hover:scale-110"
              />
            </Link>
          </p>
        </div>

        <img
          src="/about-image.webp"
          alt="About project"
          className="mb-6 h-[50vh] rounded-2xl object-contain"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default About;
