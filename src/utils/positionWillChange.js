export default (currentPosition, nextPosition) => {
	const {x: currentX, y: currentY, direction: currentDirection } = currentPosition;
	if (nextPosition) {
		const {x: nextX, y: nextY, direction: nextDirection } = nextPosition;
		return currentX !== nextX || currentY !== nextY || currentDirection !== nextDirection;
	}
	return true;
}