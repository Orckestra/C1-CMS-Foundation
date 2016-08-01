const prefix = 'DEFINITIONS.';

export const STORE_DEF = prefix + 'STORE';

export function addDefinition(defType, definition) {
	return { type: STORE_DEF, defType, definition };
}
