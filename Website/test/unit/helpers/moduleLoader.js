export default function loadModule(moduleList, cb) {
	Promise.all(moduleList.map(({ module, moduleCb }) =>
		System.import(module)
		.then(moduleCb)
	))
	.then(cb);
}
