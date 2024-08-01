// App
import { NotificationProvider } from "@/contexts/notification-context";
import { Navbar, NotificationButtons } from "@/components";

const App = () => {
  return (
    <>
      <NotificationProvider>
        <Navbar />
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-10">
          <NotificationButtons />
        </div>
      </NotificationProvider>
    </>
  );
};

export default App;
