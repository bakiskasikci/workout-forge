import { redirect } from 'next/navigation';

export default function EditPlanPage() {
  redirect('/plans/create');
}
