import { useSelector } from "react-redux";

import type { RootState } from "@/store/store";
import type { FormSubmission } from "@/store/types";
import { cn } from "@/utils/cn";

function FormSubmissions() {
  const submissions = useSelector((state: RootState) => state.form.submissions);
   const lastAddedId = useSelector((state: RootState) => state.form.lastAddedId);

  if (submissions.length === 0) {
    return (
      <div
        className={cn(
          'mx-auto flex w-full max-w-3xl flex-col',
          'items-center rounded-xl border-4 p-4',
          'shadow-shadow justify-center shadow-[0px_0px_5px_2px]',
        )}
      >
        No form submissions yet
      </div>
    );
  }
  return (
    <div
      className={cn(
        'mx-auto flex w-full max-w-3xl flex-col',
        'items-center rounded-xl border-4 p-4',
        'shadow-shadow justify-center shadow-[0px_0px_5px_2px]',
      )}
    >
      <h2 className="font bold mb-6 text-center text-2xl">Submitted Forms</h2>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        {submissions.map((submission: FormSubmission) => (
          <div
            key={submission.id}
            className={cn(
              'transform rounded-xl border-2',
              'transition-shadow duration-300',
              'hover:-translate-y-1 hover:shadow-xl',
              'shadow-shadow p-5 shadow-[0px_0px_5px_2px]',
              submission.id === lastAddedId && 'border-primary-light border-4 shadow-primary-light',
            )}
          >
            <div className="mb-4 flex justify-center">
              <h3 className="text-lg font-semibold capitalize">{submission.formType} Form</h3>
            </div>

            <div className="space-y-1">
              <p>
                <span className="font-medium">Name: </span>
                {submission.data.name}
              </p>
              <p>
                <span className="font-medium">Age: </span>
                {submission.data.age}
              </p>
              <p>
                <span className="font-medium">Email: </span>
                {submission.data.email}
              </p>
              <p>
                <span className="font-medium">Password: </span>
                {submission.data.password}
              </p>
              <p>
                <span className="font-medium">Gender: </span>
                {submission.data.gender}
              </p>
              <p>
                <span className="font-medium">Country: </span>
                {submission.data.country}
              </p>
              {submission.data.picture && (
                <div className="mb-4 flex justify-center">
                  <img
                    src={submission.data.picture}
                    alt="Uploaded"
                    className="h-40 w-full rounded-xl border object-cover"
                  />
                </div>
              )}
            </div>

            <div className="mt-4 border-t pt-4">
              <p className="text-sm">
                Submitted: {new Date(submission.submittedAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default FormSubmissions;