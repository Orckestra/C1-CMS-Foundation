using System;


namespace Composite.Actions
{
    internal sealed class ActionLockingException : Exception
	{
        public ActionLockingException(string message)
            : base(message)
        {
        }
	}
}
