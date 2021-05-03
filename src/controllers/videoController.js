import Video from "../models/Video"

/*
Videos.find({}, (err, videos) => {
    if (err) {
        return res.render("server-error");
    }
    return res.render("home", { pageTitle: "Home", videos });
})
*/


export const home = async (req, res) => {
    const videos = await Video.find({});
    return res.render("home", { pageTitle: "Home", videos });
};










export const watch = (req, res) => {
    const { id } = req.params;
    res.render("watch", {pageTitle: `Watching `});
}
export const getEdit = (req, res) => {
    const { id } = req.params;
    return res.render("edit", { pageTitle: `Editing `});
}
export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    return res.redirect(`/videos/${id}`);
}

export const getUpload = (req, res) => {
    return res.render("Upload", {pageTitle: "Upload Video"});
}
export const postUpload = (req, res) => {
    const { title } = req.body;
    return res.redirect("/");
}