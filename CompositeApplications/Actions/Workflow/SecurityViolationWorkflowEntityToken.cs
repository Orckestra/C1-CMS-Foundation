using Composite.Security;

namespace Composite.Actions.Workflows
{
    public sealed class SecurityViolationWorkflowEntityToken : EntityToken
	{
        public override string Type
        {
            get { return ""; }
        }

        public override string Source
        {
            get { return ""; }
        }

        public override string Id
        {
            get { return ""; }
        }

        public override string Serialize()
        {
            return DoSerialize();
        }

        public static EntityToken Deserialize(string serializedEntityToken)
        {
            return new SecurityViolationWorkflowEntityToken();
        }
    }
}
