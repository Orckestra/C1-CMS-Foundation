import Immutable from 'immutable';
// Some useful functions when handling state
const exists = x => x;

export function hydrateChild(parent, childDefs, name, mutator) {
	if (parent.get(name)) {
		let childDef = childDefs.get(parent.get(name));
		if (mutator) {
			childDef = mutator(childDef);
		}
		return parent.set(
			name,
			childDef
		);
	} else {
		return parent;
	}
}

export function hydrateChildren(parent, childDefs, name, childMutator) {
	let list = parent.get(name);
	if (list && Immutable.Iterable.isIndexed(list)) {
		list = list.map(childName => {
			let childDef = childDefs.get(childName);
			if (childDef && childMutator) {
				childDef = childMutator(childDef);
			}
			return childDef;
		}).filter(exists);
		return parent.set(name, list);
	} else {
		return parent;
	}
}
