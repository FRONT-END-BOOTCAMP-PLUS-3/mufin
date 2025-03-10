import Category from "@/app/(anon)/category/components/Category";

const categoryPage = ({ searchParams }: { searchParams?: { c?: string } }) => {
    return (
        <Category searchParams={searchParams ?? {}}/>
    );
}
export default categoryPage;