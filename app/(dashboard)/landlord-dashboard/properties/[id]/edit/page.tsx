import PropertyForm from "@/components/forms/PropertyForm";

export default function EditPropertyPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Edit Property</h1>
      <PropertyForm mode="edit" categories={[]} />
    </div>
  );
}
