using System;
using Composite.Core.WebClient.State.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

namespace Composite.Core.WebClient.State
{
    /// <summary>
    /// Defines access to a session state
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [CustomFactory(typeof(SessionStateProviderCustomFactory))]
    public interface ISessionStateProvider 
    {
        /// <exclude />
        void AddState<T>(Guid stateId, T value, DateTime exirationDate);

        /// <exclude />
        bool TryGetState<T>(Guid stateId, out T state);

        /// <exclude />
        void SetState<T>(Guid stateId, T value, DateTime exirationDate);

        /// <exclude />
        void RemoveState(Guid stateId);
    }
}
