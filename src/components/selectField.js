function selectField(name, opts) {
    const id = name.replace(/ /g, "-").toLowerCase();

    const wrapper = document.createElement("div");
    wrapper.classList.add("input-wrapper");

    const label = document.createElement("label");
    label.textContent = name;
    label.htmlFor = id;

    const select = document.createElement("select");
    select.id = id;
    select.required = true;

    opts.forEach((o) => {
        const option = document.createElement("option");
        option.value = o;
        option.textContent = o.charAt(0).toUpperCase() + o.slice(1);

        select.appendChild(option);
    });

    wrapper.appendChild(label);
    wrapper.appendChild(select);

    return wrapper;
}

export default selectField;
