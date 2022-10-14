﻿using MediatR;
using Persistence;

namespace Application.Activities;

public class Delete
{
    public class Command : IRequest
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Command>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities!.FindAsync(new object?[] { request.Id }, cancellationToken: cancellationToken);

            if (activity is null)
                throw new Exception("Activity Not Found");

            _context.Remove(activity);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}