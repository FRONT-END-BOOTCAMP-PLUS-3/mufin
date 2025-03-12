import { HighlightedText } from "@/app/(anon)/search/components/Search.Styled";

const HighlightText = ({ text, query }: { text: string; query: string }) => {
    if (!query) return <>{text}</>;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return (
        <>
            {parts.map((part, index) =>
                part.toLowerCase() === query.toLowerCase() ? (
                    <HighlightedText key={index}>{part}</HighlightedText>
                ) : (
                    part
                )
            )}
        </>
    );
};

export default HighlightText;