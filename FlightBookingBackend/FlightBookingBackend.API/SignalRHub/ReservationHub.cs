using System;
using System.Threading.Tasks;
using FlightBookingBackend.Data.DTOs;
using FlightBookingBackend.Data.Interfaces;
using FlightBookingBackend.Data.Models;
using Microsoft.AspNetCore.SignalR;

namespace FlightBookingBackend.API.SignalRHub
{
    public class ReservationHub : Hub
    {
        private readonly IReservationService _reservationService;
        public ReservationHub(IReservationService reservationService)
        {
            _reservationService = reservationService;            
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();

            if (httpContext.Request.Query.ContainsKey("userRole"))
            {
                var userRole = httpContext.Request.Query["userRole"];
                if (userRole == Roles.Agent)
                {
                    var agentsGroupName = GetAgentsGroupName();
                    await Groups.AddToGroupAsync(Context.ConnectionId, agentsGroupName);
                }
            }
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await base.OnDisconnectedAsync(exception);
        }

        public async Task AddReservation(ReservationCreateDto reservationCreateDto)
        {
            var newReservation = await _reservationService.AddReservationAsync(reservationCreateDto);

            if (newReservation == null) 
                throw new HubException("Failed to add a new reservation!");

            var agentsGroupName = GetAgentsGroupName();

            await Clients.Group(agentsGroupName).SendAsync("NewReservation", newReservation);
        }

        private string GetAgentVisitorGroupName()
        {
            return "AgentVisitor";
        }

        private string GetAgentsGroupName()
        {
            return "Agents";
        }
    }
}