export const trending = (req, res) => res.send("Home Page Vidoes");
export const search = (req, res) => res.send("Search");

export const upload = (req, res) => res.send("Upload");
export const see = (req, res) => {
    console.log(req.params);
    return res.send(`Watch Videos#${req.params.id}`);
}
export const edit = (req, res) => res.send("Edit Videos");
export const deleteVideo = (req, res) => res.send("Delete Video");