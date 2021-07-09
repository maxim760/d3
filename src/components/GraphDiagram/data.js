import { colors } from "./colors";

export const nodes = [];
export const links = [];

const SIZE = {
  CENTER: 25,
  CHILD: 12,
  LEAF: 5,
};

const DISTANCE = {
  CENTER: 45,
  LEAF: 20,
  DEFAULT: 25,
};

export const MANY_BODY_STRENGTH = -8;
let i = 0;

const addCenterNode = (node) => {
  node.size = SIZE.CENTER;
  node.color = colors[i++][1];
  nodes.push(node);
};
const addChildNode = (
  parentNode,
  childNode,
  size = SIZE.CHILD,
  distance = DISTANCE.DEFAULT
) => {
  childNode.size = size;
  childNode.color = parentNode.color  
  nodes.push(childNode);
  links.push({
    source: parentNode,
    target: childNode,
    distance,
    color: parentNode.color
  });
};

const assembleChildNode = (parentNode, id, numLeaves = 20) => {
  const childNode = { id };
  addChildNode(parentNode, childNode);

  for (let i = 0; i < numLeaves; i++) {
    addChildNode(childNode, { id: '' }, SIZE.LEAF, DISTANCE.LEAF);
  }
};

const connectMainNodes = (source, target) => {
  links.push({
    source,
    target,
    distance: DISTANCE.CENTER,
    color: source.color
  });
};

const artsWeb = { id: 'Arts Web' };
addCenterNode(artsWeb);
assembleChildNode(artsWeb, 'Community Vision');
assembleChildNode(artsWeb, 'Silicon Valley Creates');

const socialImpactCommons = { id: 'Social Impact Commons' };
addCenterNode(socialImpactCommons);
assembleChildNode(socialImpactCommons, 'Theatre Bay Area');
assembleChildNode(socialImpactCommons, 'EastSide Arts Alliance');
assembleChildNode(socialImpactCommons, 'Local Color');

const cast = { id: 'Community Arts Stabilization Trust' };
addCenterNode(cast);
assembleChildNode(cast, 'CounterPulse');
assembleChildNode(cast, 'Luggage Store Gallery');
assembleChildNode(cast, 'Performing Arts Workshop');
assembleChildNode(cast, '447 Minna St.', 5);
assembleChildNode(cast, 'Keeping Space Oakland');

const ambitioUS = { id: 'AmbitioUS' };
addCenterNode(ambitioUS);
assembleChildNode(ambitioUS, 'EBPREC');
assembleChildNode(ambitioUS, 'SELC', 3);
assembleChildNode(ambitioUS, 'The Runway Project', 3);
assembleChildNode(ambitioUS, 'Common Future', 3);
assembleChildNode(ambitioUS, 'Freelancers Union', 3);
assembleChildNode(ambitioUS, 'US Federation of Worker Cooperatives', 3);

connectMainNodes(artsWeb, socialImpactCommons);
connectMainNodes(artsWeb, cast);
connectMainNodes(socialImpactCommons, cast);
connectMainNodes(ambitioUS, cast);
connectMainNodes(ambitioUS, socialImpactCommons);
connectMainNodes(ambitioUS, artsWeb);