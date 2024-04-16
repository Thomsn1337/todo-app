function textareaField(name) {
    const id = name.replace(/ /g, "-").toLowerCase();

    const wrapper = document.createElement("div");
    wrapper.classList.add("input-wrapper");

    const label = document.createElement("label");
    label.textContent = name;
    label.htmlFor = id;

    const textarea = document.createElement("textarea");
    textarea.id = id;
    textarea.required = false;

    wrapper.appendChild(label);
    wrapper.appendChild(textarea);

    return wrapper;
}

export default textareaField;
