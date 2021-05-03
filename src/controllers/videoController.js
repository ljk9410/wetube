const videos = [
    {
        title: "video#1",
        rating: 5,
        comment: 2,
        caratedAt: "2 mins ago",
        views: 1,
        id: 1
    },
    {
        title: "video#2",
        rating: 5,
        comment: 2,
        caratedAt: "2 mins ago",
        views: 59,
        id: 2
    },
    {
        title: "video#3",
        rating: 5,
        comment: 2,
        caratedAt: "2 mins ago",
        views: 59,
        id: 3
    }
];

export const trending = (req, res) => res.render("home", {pageTitle: "Home", videos});
export const watch = (req, res) => {
    const { id } = req.params;
    const video = videos[id - 1];
    res.render("watch", {pageTitle: `Watching ${video.title}`, video});
}
export const getEdit = (req, res) => {
    const { id } = req.params;
    const video = videos[id - 1];
    return res.render("edit", { pageTitle: `Editing: ${video.title}`, video });
}
export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    videos[id - 1].title = title;
    return res.redirect(`/videos/${id}`);
}