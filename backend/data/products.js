const products = [
    //  Stock images - Used
    {
        name: "Blue Hoodie - AI",
        image: "/images/hoodie-blue.jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac maximus magna. In eget sapien a turpis volutpat cursus eu pharetra leo. Donec erat sem, luctus ut velit id, pretium pharetra neque. Nullam ornare dui quam, ut elementum metus tristique quis. Donec sed gravida massa, ac vestibulum risus. Nunc sed odio nec tortor ullamcorper fermentum. Nam efficitur vitae velit id dignissim. Ut a justo ac ante sodales pulvinar id at est. Suspendisse accumsan leo sit amet hendrerit varius. Donec vehicula, diam tincidunt mattis mattis, odio dui tincidunt arcu, sed venenatis erat quam a enim. Mauris fringilla massa at dui egestas interdum.",
        category: "Hoodies",
        price: 399,
        countInStock: 20,
        rating: 5,
        numReviews: 12
    },
    {
        name: "White Sweater - AI",
        image: "/images/sweater-white.jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac maximus magna. In eget sapien a turpis volutpat cursus eu pharetra leo. Donec erat sem, luctus ut velit id, pretium pharetra neque. Nullam ornare dui quam, ut elementum metus tristique quis. Donec sed gravida massa, ac vestibulum risus. Nunc sed odio nec tortor ullamcorper fermentum. Nam efficitur vitae velit id dignissim. Ut a justo ac ante sodales pulvinar id at est. Suspendisse accumsan leo sit amet hendrerit varius. Donec vehicula, diam tincidunt mattis mattis, odio dui tincidunt arcu, sed venenatis erat quam a enim. Mauris fringilla massa at dui egestas interdum.",
        category: "Sweaters",
        price: 299,
        countInStock: 20,
        rating: 5,
        numReviews: 12
    },
    {
        name: "Black Hoodie - AI",
        image: "/images/hoodie-black2.png",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac maximus magna. In eget sapien a turpis volutpat cursus eu pharetra leo. Donec erat sem, luctus ut velit id, pretium pharetra neque. Nullam ornare dui quam, ut elementum metus tristique quis. Donec sed gravida massa, ac vestibulum risus. Nunc sed odio nec tortor ullamcorper fermentum. Nam efficitur vitae velit id dignissim. Ut a justo ac ante sodales pulvinar id at est. Suspendisse accumsan leo sit amet hendrerit varius. Donec vehicula, diam tincidunt mattis mattis, odio dui tincidunt arcu, sed venenatis erat quam a enim. Mauris fringilla massa at dui egestas interdum.",
        category: "Hoodies",
        price: 399,
        countInStock: 20,
        rating: 5,
        numReviews: 12
    },
    {
        name: "Black Star Wars Hoodie - AI",
        image: "/images/hoodie-black-star-wars.png",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac maximus magna. In eget sapien a turpis volutpat cursus eu pharetra leo. Donec erat sem, luctus ut velit id, pretium pharetra neque. Nullam ornare dui quam, ut elementum metus tristique quis. Donec sed gravida massa, ac vestibulum risus. Nunc sed odio nec tortor ullamcorper fermentum. Nam efficitur vitae velit id dignissim. Ut a justo ac ante sodales pulvinar id at est. Suspendisse accumsan leo sit amet hendrerit varius. Donec vehicula, diam tincidunt mattis mattis, odio dui tincidunt arcu, sed venenatis erat quam a enim. Mauris fringilla massa at dui egestas interdum.",
        category: "Hoodies",
        price: 399,
        countInStock: 20,
        rating: 5,
        numReviews: 12
    },
    {
        name: "White/Black Sweater - AI",
        image: "/images/sweater-black-white.jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac maximus magna. In eget sapien a turpis volutpat cursus eu pharetra leo. Donec erat sem, luctus ut velit id, pretium pharetra neque. Nullam ornare dui quam, ut elementum metus tristique quis. Donec sed gravida massa, ac vestibulum risus. Nunc sed odio nec tortor ullamcorper fermentum. Nam efficitur vitae velit id dignissim. Ut a justo ac ante sodales pulvinar id at est. Suspendisse accumsan leo sit amet hendrerit varius. Donec vehicula, diam tincidunt mattis mattis, odio dui tincidunt arcu, sed venenatis erat quam a enim. Mauris fringilla massa at dui egestas interdum.",
        category: "Sweaters",
        price: 600,
        countInStock: 20,
        rating: 5,
        numReviews: 12
    },
    {
        name: "Grey Sweater - AI",
        image: "/images/sweater-grey.jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac maximus magna. In eget sapien a turpis volutpat cursus eu pharetra leo. Donec erat sem, luctus ut velit id, pretium pharetra neque. Nullam ornare dui quam, ut elementum metus tristique quis. Donec sed gravida massa, ac vestibulum risus. Nunc sed odio nec tortor ullamcorper fermentum. Nam efficitur vitae velit id dignissim. Ut a justo ac ante sodales pulvinar id at est. Suspendisse accumsan leo sit amet hendrerit varius. Donec vehicula, diam tincidunt mattis mattis, odio dui tincidunt arcu, sed venenatis erat quam a enim. Mauris fringilla massa at dui egestas interdum.",
        category: "Sweaters",
        price: 399,
        countInStock: 20,
        rating: 5,
        numReviews: 12
    },
    {
        name: "Orange Sweater - AI",
        image: "/images/sweater-orange.jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac maximus magna. In eget sapien a turpis volutpat cursus eu pharetra leo. Donec erat sem, luctus ut velit id, pretium pharetra neque. Nullam ornare dui quam, ut elementum metus tristique quis. Donec sed gravida massa, ac vestibulum risus. Nunc sed odio nec tortor ullamcorper fermentum. Nam efficitur vitae velit id dignissim. Ut a justo ac ante sodales pulvinar id at est. Suspendisse accumsan leo sit amet hendrerit varius. Donec vehicula, diam tincidunt mattis mattis, odio dui tincidunt arcu, sed venenatis erat quam a enim. Mauris fringilla massa at dui egestas interdum.",
        category: "Sweaters",
        price: 449,
        countInStock: 20,
        rating: 5,
        numReviews: 12
    },
    {
        name: "Red Hoodie - AI",
        image: "/images/hoodie-red.jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac maximus magna. In eget sapien a turpis volutpat cursus eu pharetra leo. Donec erat sem, luctus ut velit id, pretium pharetra neque. Nullam ornare dui quam, ut elementum metus tristique quis. Donec sed gravida massa, ac vestibulum risus. Nunc sed odio nec tortor ullamcorper fermentum. Nam efficitur vitae velit id dignissim. Ut a justo ac ante sodales pulvinar id at est. Suspendisse accumsan leo sit amet hendrerit varius. Donec vehicula, diam tincidunt mattis mattis, odio dui tincidunt arcu, sed venenatis erat quam a enim. Mauris fringilla massa at dui egestas interdum.",
        category: "Hoodies",
        price: 399,
        countInStock: 20,
        rating: 5,
        numReviews: 12
    },
    {
        name: "White Patterned Hoodie - AI",
        image: "/images/hoodie-white-marks.jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac maximus magna. In eget sapien a turpis volutpat cursus eu pharetra leo. Donec erat sem, luctus ut velit id, pretium pharetra neque. Nullam ornare dui quam, ut elementum metus tristique quis. Donec sed gravida massa, ac vestibulum risus. Nunc sed odio nec tortor ullamcorper fermentum. Nam efficitur vitae velit id dignissim. Ut a justo ac ante sodales pulvinar id at est. Suspendisse accumsan leo sit amet hendrerit varius. Donec vehicula, diam tincidunt mattis mattis, odio dui tincidunt arcu, sed venenatis erat quam a enim. Mauris fringilla massa at dui egestas interdum.",
        category: "Hoodies",
        price: 399,
        countInStock: 20,
        rating: 5,
        numReviews: 12
    },
    {
        name: "White Hoodie - AI",
        image: "/images/hoodie-white.jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac maximus magna. In eget sapien a turpis volutpat cursus eu pharetra leo. Donec erat sem, luctus ut velit id, pretium pharetra neque. Nullam ornare dui quam, ut elementum metus tristique quis. Donec sed gravida massa, ac vestibulum risus. Nunc sed odio nec tortor ullamcorper fermentum. Nam efficitur vitae velit id dignissim. Ut a justo ac ante sodales pulvinar id at est. Suspendisse accumsan leo sit amet hendrerit varius. Donec vehicula, diam tincidunt mattis mattis, odio dui tincidunt arcu, sed venenatis erat quam a enim. Mauris fringilla massa at dui egestas interdum.",
        category: "Hoodies",
        price: 399,
        countInStock: 20,
        rating: 5,
        numReviews: 12
    },
    {
        name: "Yellow Hoodie - AI",
        image: "/images/hoodie-yellow.jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac maximus magna. In eget sapien a turpis volutpat cursus eu pharetra leo. Donec erat sem, luctus ut velit id, pretium pharetra neque. Nullam ornare dui quam, ut elementum metus tristique quis. Donec sed gravida massa, ac vestibulum risus. Nunc sed odio nec tortor ullamcorper fermentum. Nam efficitur vitae velit id dignissim. Ut a justo ac ante sodales pulvinar id at est. Suspendisse accumsan leo sit amet hendrerit varius. Donec vehicula, diam tincidunt mattis mattis, odio dui tincidunt arcu, sed venenatis erat quam a enim. Mauris fringilla massa at dui egestas interdum.",
        category: "Hoodies",
        price: 399,
        countInStock: 20,
        rating: 5,
        numReviews: 12
    },
    {
        name: "White Patterned Sweater - AI",
        image: "/images/sweater-white-marks.jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac maximus magna. In eget sapien a turpis volutpat cursus eu pharetra leo. Donec erat sem, luctus ut velit id, pretium pharetra neque. Nullam ornare dui quam, ut elementum metus tristique quis. Donec sed gravida massa, ac vestibulum risus. Nunc sed odio nec tortor ullamcorper fermentum. Nam efficitur vitae velit id dignissim. Ut a justo ac ante sodales pulvinar id at est. Suspendisse accumsan leo sit amet hendrerit varius. Donec vehicula, diam tincidunt mattis mattis, odio dui tincidunt arcu, sed venenatis erat quam a enim. Mauris fringilla massa at dui egestas interdum.",
        category: "Sweaters",
        price: 399,
        countInStock: 20,
        rating: 5,
        numReviews: 12
    },
    {
        name: "White Sweater - AI",
        image: "/images/sweater-white.jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac maximus magna. In eget sapien a turpis volutpat cursus eu pharetra leo. Donec erat sem, luctus ut velit id, pretium pharetra neque. Nullam ornare dui quam, ut elementum metus tristique quis. Donec sed gravida massa, ac vestibulum risus. Nunc sed odio nec tortor ullamcorper fermentum. Nam efficitur vitae velit id dignissim. Ut a justo ac ante sodales pulvinar id at est. Suspendisse accumsan leo sit amet hendrerit varius. Donec vehicula, diam tincidunt mattis mattis, odio dui tincidunt arcu, sed venenatis erat quam a enim. Mauris fringilla massa at dui egestas interdum.",
        category: "Sweaters",
        price: 699,
        countInStock: 20,
        rating: 5,
        numReviews: 12
    },
    {
        name: "Yellow Sweater - AI",
        image: "/images/sweater-yellow.jpeg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac maximus magna. In eget sapien a turpis volutpat cursus eu pharetra leo. Donec erat sem, luctus ut velit id, pretium pharetra neque. Nullam ornare dui quam, ut elementum metus tristique quis. Donec sed gravida massa, ac vestibulum risus. Nunc sed odio nec tortor ullamcorper fermentum. Nam efficitur vitae velit id dignissim. Ut a justo ac ante sodales pulvinar id at est. Suspendisse accumsan leo sit amet hendrerit varius. Donec vehicula, diam tincidunt mattis mattis, odio dui tincidunt arcu, sed venenatis erat quam a enim. Mauris fringilla massa at dui egestas interdum.",
        category: "Sweaters",
        price: 399,
        countInStock: 20,
        rating: 5,
        numReviews: 12
    },
]

export default products