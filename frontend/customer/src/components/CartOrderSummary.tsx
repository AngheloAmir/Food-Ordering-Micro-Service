import StickyPostCard from "./ui/StickyPostCard/StickyPostCard";

export default function CartOrderSummary() {
    return (
        <StickyPostCard
            className="mt-5 md:mt-0"
            design="default"
            rotation="toright"
            titleVariant="textcenter"
            title='Order Summary'
            titleBadge='12/15/2025'
            containsOrderTable={[
                {
                    name: "Burger",
                    quantity: 2,
                    price: 10,
                },
                {
                    name: "Fries",
                    quantity: 1,
                    price: 5,
                },
                {
                    name: "Soda",
                    quantity: 1,
                    price: 2,
                },
            ]}

            buttonName="Place Order"
            onClickButton={() => {

            }}
        />
    );
}