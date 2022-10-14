﻿using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities;

public class Edit
{
    public class Command : IRequest
    {
        public Activity? Activity { get; set; }
    }

    public class Handler : IRequestHandler<Command>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities!.FindAsync(new object?[] { request.Activity!.Id }, cancellationToken: cancellationToken);

            if (activity is null)
                throw new Exception("Activity Not Found");

            _mapper.Map(request.Activity, activity);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
