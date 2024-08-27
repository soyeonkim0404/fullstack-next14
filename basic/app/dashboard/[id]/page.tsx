export default function DashboardDetailPage({params, searchParams}) {
    console.log(params)
  return <div>Dashboard Detail Page {params.id} {searchParams.code}</div>;
}
