using System;
using Composite.WebClient.State.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

namespace Composite.WebClient.State
{
    /// <summary>
    /// Defines access to a session state
    /// </summary>
    [CustomFactory(typeof(SessionStateProviderCustomFactory))]
    public interface ISessionStateProvider 
    {
        void AddState<T>(Guid stateId, T value, DateTime exirationDate);
        bool TryGetState<T>(Guid stateId, out T state);
        void SetState<T>(Guid stateId, T value, DateTime exirationDate);
        void RemoveState(Guid stateId);
    }
}
