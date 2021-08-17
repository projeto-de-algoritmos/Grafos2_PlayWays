import { priorities } from "./mocks.js";

export default function generateGraph(userSubjects) {
  let userNodes = [];

  for (const subject in priorities) {
    if (!userSubjects[subject]) {
      let node = new Node(subject);

      priorities[subject].forEach((locked) => {
        //if user has not done subject yet, add it to adjacents
        if (!userSubjects[locked]) {
          node.addAdjacent(locked);
        } else {
          throw { locked, subject };
        }
      });

      userNodes.push(node);
    }
  }

  let userPriorities = userNodes.map((node) => {
    let priority = calculatePriority(userNodes, node);

    return {
      subject: node,
      priority: priority,
    };
  });

  console.log(userPriorities);

  return userPriorities;
}

function calculatePriority(userNodes, node) {
  let subPriority = 0;

  for (const requisite in node.adjacents) {
    //TODO comparar cada value dos userNodes e encontrar o == requisite pra chamar no calculate

    let requisiteNode = userNodes.find((userNode) => {
      return userNode.value === node.adjacents[requisite];
    });

    if (typeof requisiteNode !== "undefined") {
      let requisitePriority = calculatePriority(userNodes, requisiteNode);
      if (requisitePriority > subPriority) {
        subPriority = requisitePriority;
      }
    }
  }
  return subPriority + 1;
}

class Node {
  constructor(value) {
    this.value = value;
    this.adjacents = []; // adjacency list
  }

  addAdjacent(node) {
    this.adjacents.push(node);
  }
}
