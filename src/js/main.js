const form = select(".new-article");

const articleHeadline = select(".article-headline");
const articleAddTag = select(".article-add-tag");
const tagContainer = select(".tag-container");

const saveBtn = select(".save");

form.addEventListener("submit", (e) => e.preventDefault());

const addTag = (tagName) => {
  try {
    tagIsExist(tagName);
    let tag = document.createElement("span");
    tag.className = "tag";
    tag.dataset.text = tagName;

    let delBtn = document.createElement("button");
    delBtn.setAttribute("type", "button");
    delBtn.innerHTML = "&times;";
    delBtn.className = "btn mini del delete-tag";

    let text = document.createTextNode(tagName);

    tag.appendChild(text);
    tag.appendChild(delBtn);

    tagContainer.appendChild(tag);

    fadeIn(tag, { display: "flex" });
  } catch (error) {
    alertMessage(error, {}, "error");
  }
};

const deleteTag = (tag) => {
  fadeOut(tag, {
    complete: () => {
      tag.remove();
    },
  });
};

const tagIsExist = (tagName) => {
  const tags = selectAll(".tag");
  tags.forEach(function (tag) {
    if (tagName === tag.dataset.text) {
      throw `Ez a cimke (${tagName}) már hozza van adva!`;
    }
  });
};

tagContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-tag")) {
    deleteTag(e.target.parentElement);
  }
});

saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  try {
    const tags = document.querySelectorAll(".tag");
    if (articleHeadline.value === "") {
      throw "A címet kötelező megadni!";
      return;
    }
    if (articleSubHeadline.getLength() === 1) {
      throw "A alcímet kötelező megadni!";
      return;
    }
    if (articleBody.getLength() === 1) {
      throw "A bekezdést kötelező megadni!";
      return;
    }
    if (tags.length === 0) {
      throw "Legalább egy cimkét kötelező megadni!";
      return;
    }

    let tagArr = [];
    tags.forEach(function (tag) {
      tagArr.push(tag.dataset.text);
    });

    const data = {
      headline: articleHeadline.value,
      subHeadlineContent: articleSubHeadline.getContents().ops,
      subHeadlineTxt: articleSubHeadline.root.innerHTML,
      bodyContent: articleBody.getContents().ops,
      bodyTxt: articleBody.root.innerHTML,
      tags: tagArr,
    };

    console.log(data);
    setTimeout(() => {
      alertMessage("Sikeres mentés!", {}, "info");
    }, 2000);
  } catch (error) {
    alertMessage(error, {}, "error");
    return;
  }
});

articleAddTag.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const tags = this.value.split(",");
    tags.forEach((tag) => {
      let txt = tag.trim();
      if (txt != "") {
        addTag(txt);
      }
    });
    this.value = "";
  }
});

// Mock data
// articleHeadline.value =
//   "Hamarosan Optimus Prime-ot is megépíthetik a LEGO-rajongók";
// articleSubHeadline.setContents([
//   {
//     insert: `Újabb népszerű franchise-t húzott be a LEGO, hamarosan Optimus Prime-ot is megépíthetik a rajongóik. A felnőtteknek (is) szóló modell ráadásul bármikor átalakítható.\n`,
//   },
// ]);
// articleBody.setContents([
//   {
//     insert: `Mikor már azt hinnénk, nincs több franchise, amellyel összeállhatna a LEGO, meglepnek bennünket egy bejelentéssel: a minap bemutatkozott Optimus Prime legósított változata, amelyre június 1-től, 170 euró fejében csaphatnak majd le a Transformers-rajongó LEGO-fanatikusok - vagy a LEGO-rajongó Transformers-fanatikusok, de ez részletkérdés.\n\nA modell a karakter G1-es dizájnja alapján készült, ami tökéletes választás volt erre a célra, és természetesen nem is Transformers-termékről beszélnénk, ha az nem lenne képes átalakulásra: bizony, Optimus Prime-ot bármikor áthajtogathatjuk kamionná; előbbi formájában 35, utóbbiban 15 centiméter magas. Több mint 1500 kockával kell számolnia egyébként a leendő építőknek.\n\n`,
//   },
// ]);
// addTag("transformers");
// addTag("lego");
// addTag("hír");
// addTag("Optimus Prime");
// addTag("modell");
// addTag("kocka");
