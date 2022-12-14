using Microsoft.EntityFrameworkCore.Migrations;

namespace FlightBookingBackend.Data.Migrations
{
    public partial class HubConnectionIdAddedToUserModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "HubConnectionId",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HubConnectionId",
                table: "Users");
        }
    }
}
