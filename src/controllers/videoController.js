export const trending = (req, res) => {
    const videos = [
        {
            title: "video#1",
            rating: 5,
            comment: 2,
            caratedAt: "2 mins ago",
            views: 59,
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
    return res.render("home", {pageTitle: "Home", videos});
}
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const see = (req, res) => res.render("watch", {pageTitle: "Watch"});
export const edit = (req, res) => res.render("edit", {pageTitle: "Edit"});
export const deleteVideo = (req, res) => res.send("Delete Video");