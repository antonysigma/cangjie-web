import Trie from "trie-prefix-tree";

import {utf8data} from "./utf8data";

const trie = Trie([...Object.keys(utf8data) ].map((key) => key.slice(1)));

export {trie};
