import Layout from "./components/Layout";
import PanelRequests from "./components/PanelRequests";
import PanelRequestsLocal from "./components/PanelRequestsLocal";
export default function Home() {
  return (
    <Layout>
      <div className="space-y-6">
        <PanelRequestsLocal/>
        <PanelRequests />
      </div>
    </Layout>
  );
}
