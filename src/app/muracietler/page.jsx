import Layout from "../components/Layout";
import FormNewRequest from "../components/PanelRequests";

export default function MuracietlerPage() {
  return (
      <Layout>
      <div className="space-y-6">
        <FormNewRequest />
      </div>
    </Layout>
  );
}
