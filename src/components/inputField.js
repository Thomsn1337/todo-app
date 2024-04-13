function inputField(name, type = "text") {
    const id = name.replace(/ /g, "-").toLowerCase();

    const wrapper = document.createElement("div");
    wrapper.classList.add("input-wrapper");

    const label = document.createElement("label");
    label.textContent = name;
    label.htmlFor = id;

    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.required = true;

    wrapper.appendChild(label);
    wrapper.appendChild(input);

    return wrapper;
}

export default inputField;
