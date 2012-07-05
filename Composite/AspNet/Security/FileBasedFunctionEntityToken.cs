using System;
using Composite.C1Console.Security;

namespace Composite.AspNet.Security
{
	[SecurityAncestorProvider(typeof(StandardFunctionSecurityAncestorProvider))]
	internal class FileBasedFunctionEntityToken : EntityToken
	{
		private readonly string _id;
		public override string Id
		{
			get { return _id; }
		}

        private readonly string _source;
		public override string Source
		{
			get { return _source; }
		}

		public override string Type
		{
			get { return String.Empty; }
		}

        public string FunctionProviderName
        {
            get { return Source; }
        }

        public string FunctionName
        {
            get { return Id; }
        }

		public FileBasedFunctionEntityToken(string providerName, string functionFullName)
		{
            _source = providerName;
            _id = functionFullName;
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
