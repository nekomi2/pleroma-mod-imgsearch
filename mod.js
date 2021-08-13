PleromaModImgsearch = function () {
    this.config = {
        stylesheet: "style.css",
        // url: "https://iqdb.org/?url={img}"
        url: "https://saucenao.com/search.php?url={img}"
    };
};

PleromaModImgsearch.prototype.run = function () {
    PleromaModLoader.includeModCss("pleroma-mod-imgsearch/" + this.config.stylesheet);
};

PleromaModImgsearch.prototype.onMutation = function (mutation, observer) {
    for (const addedNode of mutation.addedNodes) {
        this.handlePost(addedNode);
    }
};

PleromaModImgsearch.prototype.onReady = function () {
    const posts = document.querySelectorAll(".status");
    for (const post of posts) {
        this.handlePost(post);
    }
};

PleromaModImgsearch.prototype.createSearchBtn = function (attachment) {
    let imgAttachment = attachment.querySelector("a.image-attachment");
    if(imgAttachment) {
        let href = imgAttachment.getAttribute("href");
        if(href) {
            let query = this.config.url.replace("{img}", href);
            let btn = document.createElement("a");
            btn.classList.add("imgsearch");
            btn.classList.add("button-icon");
            btn.setAttribute("href", query);
            btn.setAttribute("target", "_blank");
            btn.innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="fa-scale-110 fa-old-padding svg-inline--fa fa-search fa-w-16 fa-fw"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" class=""></path></svg>';
            return btn;
        }
    }

    return null;
};

PleromaModImgsearch.prototype.handlePost = function (postElement) {
    if (postElement.querySelectorAll && postElement.querySelectorAll(".attachments").length > 0) {
        //Get image attachments
        const attachments = postElement.querySelectorAll("div.gallery-row div.attachment.image");
        for (const attachment of attachments) {
            //Add search button in image attachment element
            attachment.appendChild(this.createSearchBtn(attachment));
        }
    }
};

PleromaModLoader.registerMod(PleromaModImgsearch);