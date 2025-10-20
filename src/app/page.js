import Layout from "./components/Layout";
import PanelRequests from "./components/PanelRequests";
export default function Home() {
  return (
    <Layout>
      <div className="space-y-6">
        <PanelRequests />
      </div>
    </Layout>
  );
}
