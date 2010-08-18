using Composite.Security;

namespace Composite.Actions.Workflows
{
    internal sealed class SecurityViolationWorkflowEntityToken : EntityToken
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
            get { return "SecurityViolationWorkflowEntityToken"; }
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
