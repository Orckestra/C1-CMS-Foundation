using System;


namespace Composite.Actions
{
    public sealed class ActionLockingException : Exception
	{
        public ActionLockingException(string message)
            : base(message)
        {
        }
	}
}
