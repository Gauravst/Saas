// src/app/dashboard/edit/[id]/page.tsx

type Props = {
  params: {
    id?: string; // Marking id as optional in case it's not available initially
  };
};

const Page = async ({ params }: Props) => {
  // Check if `params` is fully resolved
  const id = params?.id;

  if (id) {
    return <div>id - {id}</div>;
  } else {
    return <div>No ID found</div>;
  }
};

export default Page;
