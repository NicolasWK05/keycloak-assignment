import { For } from "solid-js";
import ProtectedRoute from "~/components/protectedRoute";

const activities = [
  {
    id: 1,
    name: "Debugging Recovery Group",
  },
  {
    id: 2,
    name: "Legacy Code Therapy",
  },
  {
    id: 3,
    name: "Weekly Mindfulness Session",
  },
];

export default function Activities() {
  const signup = (activity: string) => {
    alert(`Signed up for ${activity}`);
  };

  return (
    <ProtectedRoute>
      <div class="max-w-5xl mx-auto p-8">
        <h1 class="text-3xl font-bold mb-6">Activities</h1>

        <div class="grid gap-4">
          <For each={activities}>
            {(activity) => (
              <div class="border rounded-lg p-4">
                <h2 class="font-semibold text-lg">{activity.name}</h2>

                <button
                  class="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={() => signup(activity.name)}
                >
                  Sign Up
                </button>
              </div>
            )}
          </For>
        </div>
      </div>
    </ProtectedRoute>
  );
}
