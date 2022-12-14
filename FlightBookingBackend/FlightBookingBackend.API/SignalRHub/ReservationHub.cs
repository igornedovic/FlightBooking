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
        private readonly IUserService _userService;
        public ReservationHub(IReservationService reservationService, IUserService userService)
        {
            _reservationService = reservationService;
            _userService = userService;
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
                else if (userRole == Roles.Visitor && httpContext.Request.Query.ContainsKey("userId"))
                {
                    string userIdString = httpContext.Request.Query["userId"];
                    int userId = int.Parse(userIdString);
                    await _userService.AddHubConnectionId(userId, Context.ConnectionId);
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

            
            await Clients.Group(GetAgentsGroupName()).SendAsync("NewReservation", newReservation);
        }

        public async Task UpdateReservationStatus(int id, string status, string firstName, string lastName, int flightId, int numberOfSeats)
        {
            System.Console.WriteLine($"{id} {status} {firstName} {lastName} {flightId} {numberOfSeats}");

            var newStatus = await _reservationService
                            .ChangeReservationStatusAsync(id, status, flightId, numberOfSeats);

            if (newStatus == null)
                throw new HubException("Failed to change reservation status!");

            var connectionIdDto = await _userService.GetHubConnectionId(firstName, lastName);

            await Clients.Client(connectionIdDto.HubConnectionId)
                            .SendAsync("UpdatedReservationStatus", id, newStatus);

            await Clients.Group(GetAgentsGroupName())
                            .SendAsync("UpdatedReservationStatus", id, newStatus);
        }

        private string GetAgentsGroupName()
        {
            return "Agents";
        }
    }
}