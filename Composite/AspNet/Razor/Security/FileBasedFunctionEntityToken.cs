using System;
using Composite.C1Console.Security;

namespace Composite.AspNet.Razor.Security
{
	[SecurityAncestorProvider(typeof(StandardFunctionSecurityAncestorProvider))]
	internal class FileBasedFunctionEntityToken : EntityToken
	{
		private string _id;
		public override string Id
		{
			get { return _id; }
		}

		private string _source;
		public override string Source
		{
			get { return _source; }
		}

		public override string Type
		{
			get { return String.Empty; }
		}

		public FileBasedFunctionEntityToken(string source, string id)
		{
			_source = source;
			_id = id;
		}

		public override string Serialize()
		{
			return DoSerialize();
		}

		public static EntityToken Deserialize(string serializedEntityToken)
		{
			string type;
			string source;
			string id;

			DoDeserialize(serializedEntityToken, out type, out source, out id);

			return new FileBasedFunctionEntityToken(source, id);
		}
	}
}
